'use client'

import {useState, useRef, ChangeEvent} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import html2canvas from 'html2canvas'

const templates = [
    { id: 'circle', name: 'Circle', shape: 'rounded-full overflow-hidden' },
    { id: 'square', name: 'Square', shape: 'rounded-none' },
    { id: 'triangle', name: 'Triangle', shape: 'clip-path-triangle overflow-hidden' },
    { id: 'star', name: 'Star', shape: 'clip-path-star overflow-hidden' },
    { id: 'hexagon', name: 'Hexagon', shape: 'clip-path-hexagon overflow-hidden' },
    { id: 'bang1', name: 'Bang 1', shape: 'clip-path-bang1 overflow-hidden' },
    { id: 'bang2', name: 'Bang 2', shape: 'clip-path-bang2 overflow-hidden' },
]

const textColors = [
    { id: 'yellow', name: 'Yellow', class: 'text-yellow-300' },
    { id: 'black', name: 'Black', class: 'text-black' },
    { id: 'white', name: 'White', class: 'text-white' },
]

const patterns = [
    { id: 'custom', name: 'Custom Image', class: 'bg-custom' },
    { id: 'dots', name: 'Dots', class: 'bg-dots' },
    { id: 'lines', name: 'Lines', class: 'bg-lines' },
    { id: 'checkers', name: 'Checkers', class: 'bg-checkers' },
    { id: 'stripes', name: 'Stripes', class: 'bg-stripes' },
    { id: 'waves', name: 'Waves', class: 'bg-waves' },
]

export default function UserGeneratedContent() {
    const [text, setText] = useState('')
    const [template, setTemplate] = useState(templates[0].id)
    const [textColor, setTextColor] = useState(textColors[0].id)
    const [pattern, setPattern] = useState(patterns[0].id)
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [darknessLevel, setDarknessLevel] = useState(30)
    const [fontSize, setFontSize] = useState(24)
    const [textShadow, setTextShadow] = useState(2)

    const handleSave = async () => {
        const element = document.getElementById('preview-content')
        if (element) {
            try {
                const canvas = await html2canvas(element, {
                    useCORS: true,
                    scale: 2,
                    backgroundColor: null,
                })
                const link = document.createElement('a')
                link.download = 'comic-sans-generated.png'
                link.href = canvas.toDataURL('image/png')
                link.click()
            } catch (error) {
                console.error('Error generating image:', error)
                alert('There was an error generating your image. Please try again.')
            }
        }
    }

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setBackgroundImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-yellow-100 p-6 rounded-lg shadow-lg">
            <div className="mb-6">
                <Label htmlFor="content-text" className="block mb-2 text-lg font-bold text-black">Enter your text:</Label>
                <Input
                    id="content-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-2 border border-black rounded comic-sans"
                    placeholder="Type something fun!"
                />
            </div>

            <div className="mb-6">
                <Label className="block mb-2 text-lg font-bold text-black">Choose a template:</Label>
                <RadioGroup value={template} onValueChange={setTemplate} className="grid grid-cols-3 gap-4">
                    {templates.map((t) => (
                        <div key={t.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={t.id} id={t.id} />
                            <Label htmlFor={t.id}>{t.name}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div className="mb-6">
                <Label className="block mb-2 text-lg font-bold text-black">Choose text color:</Label>
                <Select value={textColor} onValueChange={setTextColor}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                        {textColors.map((color) => (
                            <SelectItem key={color.id} value={color.id} className="bg-white">
                                {color.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="mb-6">
                <Label className="block mb-2 text-lg font-bold text-black">Choose background:</Label>
                <Select value={pattern} onValueChange={setPattern}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a background" />
                    </SelectTrigger>
                    <SelectContent className="select-content bg-white">
                        {patterns.map((p) => (
                            <SelectItem key={p.id} value={p.id} className="bg-white">
                                {p.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {pattern === 'custom' && (
                    <div className="mt-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-black text-yellow-300 hover:bg-yellow-400 hover:text-black comic-sans"
                        >
                            Upload Image
                        </Button>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <Label htmlFor="darkness-level" className="block mb-2 text-lg font-bold text-black">Adjust background darkness:</Label>
                <Slider
                    id="darkness-level"
                    min={0}
                    max={80}
                    step={1}
                    value={[darknessLevel]}
                    onValueChange={(value) => setDarknessLevel(value[0])}
                />
            </div>

            <div className="mb-6">
                <Label htmlFor="font-size" className="block mb-2 text-lg font-bold text-black">Adjust font size:</Label>
                <Slider
                    id="font-size"
                    min={12}
                    max={72}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                />
            </div>

            <div className="mb-6">
                <Label htmlFor="text-shadow" className="block mb-2 text-lg font-bold text-black">Adjust text shadow:</Label>
                <Slider
                    id="text-shadow"
                    min={0}
                    max={10}
                    step={1}
                    value={[textShadow]}
                    onValueChange={(value) => setTextShadow(value[0])}
                />
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2 text-black">Preview:</h2>
                <div
                    id="preview-content"
                    className={`w-full h-64 bg-black ${templates.find(t => t.id === template)?.shape} ${pattern !== 'custom' ? patterns.find(p => p.id === pattern)?.class : ''} flex items-center justify-center p-4 relative overflow-hidden`}
                    style={pattern === 'custom' && backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                    <div className="absolute inset-0 bg-black" style={{ opacity: darknessLevel / 100 }}></div>
                    <p
                        className={`text-center break-words comic-sans-bold ${textColors.find(c => c.id === textColor)?.class} relative z-10 font-stroke`}
                        style={{
                            fontSize: `${fontSize}px`,
                            textShadow: `${textShadow}px ${textShadow}px ${textShadow}px rgba(0, 0, 0, 1)`
                        }}
                    >
                        {text || 'Your text will appear here'}
                    </p>
                </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-black text-yellow-300 hover:bg-yellow-400 hover:text-black comic-sans">
                Download Your Creation
            </Button>
        </div>
    )
}
