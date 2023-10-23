import prismadb from "@/prisma/db";
import CompanionForm from "./components/companion-form";
interface CompanionIdPageProps {
    params: {
        companionId: string
    }
}
const CompanionIdPage = async ({ params: { companionId } }: CompanionIdPageProps) => {
    const companion = await prismadb.companion.findUnique({
        where: {
            id: companionId
        }
    })
    const category = await prismadb.category.findMany()

    return (
        <CompanionForm initialData={companion} categories={category} />);
}

export default CompanionIdPage;