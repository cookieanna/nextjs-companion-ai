"use client"
import * as z from "zod"
import axios from "axios";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;
const formSchema = z.object({
    name: z.string().min(2, {
        message: "name is required"
    }),
    description: z.string().min(2, { message: "description is required" }
    ),
    instruction: z.string().min(200, { message: "instruction require  at lest 200 characters" }
    ),
    seed: z.string().min(200, { message: "seed require  at lest 200 characters" }
    ),
    src: z.string().min(1, { message: "image is required" }
    ),
    categoryId: z.string().min(1, { message: "categoryId is required" }
    ),
})
interface companionFormProps {
    initialData: Companion | null
    categories: Category[]
}

const CompanionForm = ({ initialData, categories }: companionFormProps) => {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instruction: "",
            seed: "",
            src: "",
            categoryId: undefined


        }
    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (value: z.infer<typeof formSchema>) => {
       
        
        try {
            if (initialData) {
                await axios.patch(`/api/companion/${initialData.id}`, value)
            } else {
                await axios.post("/api/companion", value)
            }
            toast({
                description: "success"
            })
            router.refresh()
            router.push('/')
        } catch (error) {
            toast({
                variant: "destructive",
                description: "companionformpage something wrong"
            })


        }
       // console.log(value);


    }
    return (
        <div className="space-y-4 max-w-4xl p-4 h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="grid grid-col-1 md:grid-col-2 gap-4">
                        <div className="space-y-2 w-full ">
                            <div>
                                <h3 className="text-lg font-medium">information</h3>
                                <p className="text-sm text-muted-foreground">informationinformation</p>
                            </div>
                            <Separator className="bg-primary/10" />
                        </div>
                        <FormField name="src" render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                                <FormControl>
                                    <ImageUpload
                                        disable={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField name="name" control={form.control} render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel >name</FormLabel>
                                    <FormControl><Input disabled={isLoading} placeholder="罗翔" {...field}
                                    /></FormControl>
                                    <FormDescription>this is how your ai will be named</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} ></FormField>
                            <FormField name="description" control={form.control} render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel >description</FormLabel>
                                    <FormControl><Input disabled={isLoading} placeholder="著名律师" {...field} /></FormControl>
                                    <FormDescription>short description for your ai</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} ></FormField>
                            <FormField name="categoryId" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>category</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        value={field.value}
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue defaultValue={field.value} placeholder="select a category" />
                                            </SelectTrigger>

                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((item) => (
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>select a category for your ai</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} ></FormField>
                        </div>
                    </div>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">configration</h3>
                            <p className="text-sm text-muted-foreground">Detailed instruction for ai Behaviour</p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField name="instruction" control={form.control} render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel >instruction</FormLabel>
                            <FormControl><Textarea className="bg-background resize-none" rows={7} disabled={isLoading} placeholder={PREAMBLE} {...field} /></FormControl>
                            <FormDescription>Describe in detail your AIs backstory and relevant details</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} ></FormField>
                    <FormField name="seed" control={form.control} render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel >seed</FormLabel>
                            <FormControl><Textarea className="bg-background resize-none" rows={7} disabled={isLoading} placeholder={SEED_CHAT} {...field} /></FormControl>
                            <FormDescription>Describe in detail your AIs backstory and relevant details</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} ></FormField>
                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={isLoading}>{initialData ? "Edit your ai" : "create youor ai"}
                            <Wand2 className="w-4 h-4 ml-2" /></Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CompanionForm;