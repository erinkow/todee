import { Info } from "../_components/info"
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "./_components/subscription-button";

const BillingPage = async () => {
    const isPro = await checkSubscription();

    return(
        <div className="w-full mb-20">
            <Info isPro={isPro}/>
            <Separator className='my-4'/>
            <SubscriptionButton isPro={isPro}/>
        </div>
    )
}

export default BillingPage;