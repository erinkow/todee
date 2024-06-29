import { OrganizationProfile } from "@clerk/nextjs"

const SettingsPage = () => {
    return(
        <div className="w-full">
            <OrganizationProfile
                afterLeaveOrganizationUrl='/select-org'
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: 'none',
                            width: '80%',
                        },
                        card: {
                            boarder: '1px solid #e5e5e5',
                            boxShadow: 'none',
                            widows: '80%'
                        }
                    }
                }}
            />
        </div>
    );
};

export default SettingsPage;