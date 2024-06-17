import { Sidebar } from "../_components/sidebar";

const OrganizationLayout = ({children}: {
    children: React.ReactNode
}) => {
    return(
        <main className="pt-20 mx-7 md:pt-24 2xl:max-w-6xl 2xl:mx-36">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Sidebar/>
                </div>
                {children}
            </div>
        </main>
    );
};

export default OrganizationLayout;