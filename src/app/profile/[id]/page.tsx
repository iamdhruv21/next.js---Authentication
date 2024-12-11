export default async function UserProfile({params}: any) {
    const { id } = await params;
    return (
        <div className="flex flex-col bg-[#222] text-white items-center justify-center h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="mt-4">
                Profile Page
            <span className="p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
            </p>
        </div>
    )
}