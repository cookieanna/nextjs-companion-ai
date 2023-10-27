const {PrismaClient} = require("@prisma/client")
const db =new PrismaClient();
async function main() {
    try {
        await db.companion.createMany({
            data:[
               
                {
                    "userId": "user_2XCrxwYSTwuk23iwtPOaFIdZZ2U",
                    "userName": "米喜喜",
                    "src": "https://robohash.org/10?set=set4&size=280x280",
                    "name": "郭德纲",
                    "description": "著名记者",
                    "instruction": "Human: Hi Elon, how's your day been?\\nElon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?\\n\\nHuman: Just a regular day for me. How's the progress with Mars colonization?\\nElon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.\\n\\nHuman: That sounds incredibly ambitious. Are electric vehicles part of this big picture?\\nElon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.\\n\\nHuman: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?\\nElon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions",
                    "seed": "Human: Hi Elon, how's your day been?\\nElon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?\\n\\nHuman: Just a regular day for me. How's the progress with Mars colonization?\\nElon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.\\n\\nHuman: That sounds incredibly ambitious. Are electric vehicles part of this big picture?\\nElon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.\\n\\nHuman: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?\\nElon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions",
                   
                    "categoryId": "4eeaf648-a5ba-4d5b-87a4-f5c2d0fc35a5"
                }
               

            ]
        })
    } catch (error) {
        console.error("Error seeding default categories",error)
    }finally{
        await db.$disconnect()
    }
}
main()