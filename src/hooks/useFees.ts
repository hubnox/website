import { useEffect, useState } from "react";
import client from "../config/configCatClient";

export const useFees = () => {
    const [platformFee, setPlatformFee] = useState<number>(0);
    const [paymentFee, setPaymentFee] = useState<number>(0);

    useEffect(() => {
        const load = async () => {
            const pf = await client.getValueAsync("platformFee", 0);
            const payf = await client.getValueAsync("paymentFee", 0);

            setPlatformFee(pf);
            setPaymentFee(payf);
        };

        load();
    }, []);

    return { platformFee, paymentFee };
};
