
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../api/lib/auth";

const page = async() => {
    const session = await getServerSession(NEXT_AUTH)
    return (
        <div>
            user components
            {JSON.stringify(session)}
        </div>
    );
}

export default page;