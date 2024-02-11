import './Verify.css'
import Page from "../../containers/Page/Page.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useRest} from "../../hooks/useRest.ts";

function Verify() {

    const { validate } = useRest();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() =>  {
        const token = searchParams.get('token');
        console.log(token);
        if(token) {
            validate('/verify-account', token)
                .then(async res => {
                    return {
                        json: await res.json(),
                        status: res.status
                    }
                }).then(( { json, status} ) => {
                    switch (status) {
                        case 200:
                            setSuccess(json.message)
                            break;
                        case 403:
                            setError(json.description)
                            break;
                        default:
                            setError("Server error")
                    }
                })
        } else {
            setError('No token provided')
        }
    }, [searchParams])

    return (
        <Page>
            <div className={"verify"}>
                { !error && !success && <h3> Validating account... </h3>}
                { error && <h3 className={"verify-error"}> { error } </h3>}
                { success && <h3 className={"verify-success"}> { success } </h3>}
            </div>
        </Page>
    )
}

export default Verify
