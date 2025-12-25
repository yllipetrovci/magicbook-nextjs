import { CheckoutContents } from '../components/CheckoutContents';

export default async function CheckoutPage() {
    return (
        <div className={'w-full min-h-screen relative overflow-hidden'}>
            <div
                className={'mx-auto max-w-6xl relative px-[16px] md:px-[32px] py-[24px] flex flex-col gap-6 justify-between'}
            >
                {/* <CheckoutHeader /> */}
                <CheckoutContents userEmail={'yllipetrovci@gmail.com'} />
            </div>
        </div>
    );
}
