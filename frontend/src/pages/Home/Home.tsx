import Page from "../../containers/Page/Page.tsx";
import Protected from "../../containers/Protected/Protected.tsx";
import {useUser} from "../../hooks/useUser.ts";
import {useAuth} from "../../hooks/useAuth.ts";

function Home() {

    useAuth()
    const { user } = useUser()

    return (
        <Protected>
            <Page>
                Hello { user?.username }
            </Page>
        </Protected>
    )
}

export default Home
