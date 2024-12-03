import UserGeneratedContent from '../components/UserGeneratedContent'

export default function Home() {
    return (
        <main className="min-h-screen bg-yellow-300 p-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-black">Create Your Content</h1>
            <UserGeneratedContent />
        </main>
    )
}
