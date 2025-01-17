export default function ({children}:any) {
    return <div className="border-b text-center">
        20% off for the next 3 days
        {children}
    </div>;
}