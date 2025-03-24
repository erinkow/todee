import { OrganizationList } from "@clerk/nextjs"

export default function CreateOrganizationPage() {
    return(
        <OrganizationList 
            hidePersonal
            afterSelectOrganizationUrl="/organization/:id"
            // afterSelectOrganizationUrl="/organization/:organizationId"
            afterCreateOrganizationUrl="/organization/:id"
            // afterCreateOrganizationUrl="/organization/:organizationId"
        />
    );
};