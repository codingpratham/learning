import {Button} from '@repo/ui/button'

import Admin from '@repo/ui/admin'
const page = () => {
    return (
        <div>
            <Button appName='pratham'>
                Click Me
            </Button>
            <Admin/>
            <Admin/>
        </div>
    );
}

export default page;