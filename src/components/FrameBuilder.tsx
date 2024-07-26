"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FaCode } from "react-icons/fa6"
import { MdContentCopy } from "react-icons/md"
type Button = {
    label: string
    link: string
}

const FrameBuilder = () => {
    const [imageUrl, setImageUrl] = useState('https://framerusercontent.com/assets/JfP312GaWTANZbJN62qoZBUtm0Y.png')
    const [aspectRatio, setAspectRatio] = useState('1.91:1')
    const [buttons, setButtons] = useState<Button[]>([
        { label: "Let's talk", link: 'https://t.me/bhimtebhaisaab' },
        { label: 'Check us out', link: 'https://fbilabs.com/' },
    ])
    const [isPreviewMode, setIsPreviewMode] = useState(true)
    const { toast } = useToast()

    const addButton = () => {
        if (buttons.length < 4) {
            setButtons([...buttons, { label: '', link: '' }])
        }
    }

    const updateButton = (index: number, field: 'label' | 'link', value: string) => {
        const newButtons = [...buttons]
        newButtons[index][field] = value
        setButtons(newButtons)
    }

    const generateCode = () => {
        let code = `<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="${imageUrl}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="fc:frame:image:aspect_ratio" content="${aspectRatio}" />`

        buttons.forEach((button, index) => {
            if (button.label && button.link) {
                code += `
<meta property="fc:frame:button:${index + 1}" content="${button.label}" />
<meta property="fc:frame:button:${index + 1}:action" content="post_redirect" />
<meta property="fc:frame:button:${index + 1}:target" content="${button.link}" />`
            }
        })

        return code
    }

    const copyCode = () => {
        navigator.clipboard.writeText(generateCode())
        toast({
            title: "Code copied!",
            description: "The frame code has been copied to your clipboard.",
        })
    }

    const validButtons = buttons.filter((button) => button.label && button.link)

    return (
        <div className="h-screen md:grid grid-cols-5 gap-4">
            <div className="w-full col-span-2 bg-gray-50 md:p-12 p-2  flex flex-col justify-center">
                <div className='mb-8 space-y-1'>
                    <div>
                        <h2 className="text-6xl font-semibold font-serif italic">StaticFrame</h2>
                        <p className='text-md mb-2'>A simple way to integrate a simple frame to your website. <br />Copy and paste the code above to your project&apos;s {`<head>`} tag </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-4">
                        <Button variant={isPreviewMode ? "default" : "ghost"} size="icon" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                            <FaCode />
                        </Button>
                        <Button size="icon" onClick={copyCode}>
                            <MdContentCopy />
                        </Button>
                    </div>
                </div>


                <div className='flex-1'>
                    {isPreviewMode ? (
                        <div className="border rounded-lg overflow-hidden">
                            {imageUrl && <img src={imageUrl} alt="Frame Preview" className="w-full h-auto object-cover" style={{ aspectRatio: aspectRatio.split(':').join('/') }} />}
                            <div className="space-y-2 rounded-lg rounded-t-none border border-t-0 bg-[#f3f3f3] px-4 py-2 border-faint dark:bg-[#2A2432]">
                                <div className="md:flex w-full items-center md:space-x-[10px] grid grid-cols-2 gap-[10px]">
                                    {validButtons.map((button, index) => (
                                        button.label && button.link && (
                                            <button
                                                key={index}
                                                className={
                                                    cn(
                                                        "flex-1 border bg-[#fff] border-[#fff] hover:bg-[#fff]-hover hover:border-[#fff]-hover active:border-[#fff]-active disabled:border-[#fff] disabled:text-[#fff]-disabled disabled:hover:bg-[#fff] disabled:active:border-[#fff] px-4 py-2 text-sm flex h-10 flex-row !items-center justify-center rounded-lg font-normal dark:!bg-[#ffffff1a]",
                                                        validButtons.length % 2 !== 0 && (validButtons.length - 1) == index && "col-span-2"
                                                        // button index is equal tp button length nnd button length is odd number
                                                        // , { 'col-span-2':  }

                                                    )}
                                            >
                                                {button.label}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Textarea className="mb-2 h-64" value={generateCode()} readOnly />
                    )}
                </div>
            </div>

            <div className="w-full col-span-3 md:py-12 p-2 container space-y-4 flex flex-col">
                <Card>
                    <CardHeader>
                        <CardTitle>Image</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Input
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <div className='flex items-center space-x-4' >
                            <span className='text-sm font-semibold text-gray-500'>Aspect Ratio</span>
                            <RadioGroup
                                className='flex items-center'
                                defaultValue={aspectRatio} onValueChange={setAspectRatio}
                            >
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <RadioGroupItem value="1.91:1" id="ratio-1.91" />
                                    <label htmlFor="ratio-1.91">1.91:1</label>
                                </div>
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <RadioGroupItem value="1:1" id="ratio-1" />
                                    <label htmlFor="ratio-1">1:1</label>
                                </div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                </Card>

                {/* <h3 className="text-lg font-bold block">Buttons</h3> */}

                <Card>
                    <CardHeader>
                        <CardTitle>Buttons</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {buttons.map((button, index) => (
                            <div key={index} className="space-x-2 flex">
                                <div className='flex-1 space-y-1'>
                                    <label className='text-sm font-semibold text-gray-500'>Label</label>
                                    <Input
                                        placeholder={`Button ${index + 1} Label`}
                                        value={button.label}
                                        onChange={(e) => updateButton(index, 'label', e.target.value)}
                                    />
                                </div>
                                <div className='flex-1 space-y-1'>
                                    <label className='text-sm font-semibold text-gray-500'>Link target</label>
                                    <Input
                                        placeholder={`Button ${index + 1} Link`}
                                        value={button.link}
                                        onChange={(e) => updateButton(index, 'link', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        {buttons.length < 4 && (
                            <Button onClick={addButton}>Add Button</Button>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default FrameBuilder