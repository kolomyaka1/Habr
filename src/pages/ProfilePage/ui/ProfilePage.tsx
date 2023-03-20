import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCard, profileReducer } from 'feature/EditableProfileCard';
import { fetchProfileData } from 'feature/EditableProfileCard/model/services/fetchProfileData/fetchProfileData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

interface ProfilePageProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer
};

const ProfilePage = ({ className }: ProfilePageProps) => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <EditableProfileCard />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;


