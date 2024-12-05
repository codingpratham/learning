interface AppBarProps {
    title: string
}
const AppBar = ({title}:AppBarProps) => {
    return (
        <div className="p-4 border-b">
            {title}
        </div>
    );
}

export default AppBar;