import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return(
        <div className="h-screen bg-slate-100">
            <Navbar/>
            <main className="mt-20 mx-auto bg-slate-100 flex items-center justify-center">
                {children}
            </main>
        </div>
    )
}

export default MarketingLayout;