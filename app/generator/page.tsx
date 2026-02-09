'use client'

import { useRef, useState } from 'react'
import QRCode from 'qrcode'
import JsBarcode from 'jsbarcode'

export default function Generator() {
    const [textRA, setTextRA] = useState('')
    const [generated, setGenerated] = useState(false)
    const [fileLoad, setFileLoad] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [fileName, setFileName] = useState('Clique para escolher uma imagem ou solte uma aqui...')
    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [downloadMethod, setDownloadMethod] = useState('')

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [userPicture, setProfilePicture] = useState<HTMLImageElement | null>(null)

    // Drag events helpers
    const handleDrag = (e: React.DragEvent<HTMLLabelElement>, dragging: boolean) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(dragging)
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            const reader = new FileReader()

            reader.onload = () => {
                const img = new Image()
                img.src = reader.result as string
                img.crossOrigin = 'anonymous'
                img.onload = () => setProfilePicture(img)

                setFileLoad(true)
                setFileName(file.name)
            }

            reader.readAsDataURL(file)
        }
    }

    const handleDownloadMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDownloadMethod(event.target.value)
    }

    const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = () => {
            const img = new Image()
            img.src = reader.result as string
            img.crossOrigin = 'anonymous'
            img.onload = () => setProfilePicture(img)
            setFileLoad(true)
            setFileName(file.name)
        }

        reader.readAsDataURL(file)
    }

    const generateImage = async () => {
        try {
            const imgBg = new Image()
            imgBg.crossOrigin = 'anonymous'
            // Detecta se estamos rodando com basePath (produção) ou não (dev)
            const basePath = window.location.pathname.startsWith('/gerador-carteirinha') ? '/gerador-carteirinha' : ''
            imgBg.src = `${basePath}/carteirinha_em_branco.svg`
            imgBg.width = 1430
            imgBg.height = 904
            await imgBg.decode()

            const finalCanvas = canvasRef.current
            if (!finalCanvas) return
            
            const ctx = finalCanvas.getContext('2d')
            if (!ctx) return
            
            finalCanvas.width = imgBg.width
            finalCanvas.height = imgBg.height
            ctx.drawImage(imgBg, 0, 0, imgBg.width, imgBg.height)

            if (textRA.trim()) {
                const qrCanvas = document.createElement('canvas')
                let newTextRA = textRA.toString()
                if (textRA.charAt(0) !== '0') {
                    newTextRA = '0' + newTextRA
                }

                await QRCode.toCanvas(qrCanvas, newTextRA, {
                    width: 285,
                    margin: 0,
                    color: {
                        light: '#F6F6ED',
                        dark: '#333333'
                    }
                })

                try {
                    const posX = finalCanvas.width - qrCanvas.width - 94
                    const posY = finalCanvas.height - qrCanvas.height - 396
                    ctx.drawImage(qrCanvas, posX, posY)
                } catch (err) {
                    console.error('Erro ao desenhar QR code:', err)
                }

                const barcodeCanvas = document.createElement('canvas')
                barcodeCanvas.getContext('2d')

                JsBarcode(barcodeCanvas, newTextRA, {
                    format: 'CODE128',
                    width: 10.74,
                    height: 114,
                    displayValue: false,
                    margin: 0,
                    background: '#F6F6ED',
                    lineColor: '#333333'
                })

                try {
                    const posX = finalCanvas.width - barcodeCanvas.width - 95
                    const posY = finalCanvas.height - barcodeCanvas.height - 203
                    ctx.drawImage(barcodeCanvas, posX, posY)
                } catch (err) {
                    console.error('Erro ao desenhar código de barras:', err)
                }
            }

            ctx.fillStyle = '#333'
            ctx.textAlign = 'left'

            const textXStart = 488
            const textYName = 254
            const textYNameMargin = 74
            const textYUni = textYName + textYNameMargin
            const textYMargin = 56

            ctx.font = 'bold 34px sans-serif'
            ctx.fillText(name, textXStart, textYName)

            ctx.font = '32px sans-serif'
            ctx.fillText('Universidade Tecnológica Federal', textXStart, textYUni)

            ctx.fillText(course, textXStart, textYUni + (textYMargin * 1))

            ctx.font = 'bold 32px sans-serif'
            ctx.fillText('Data de validade: ', textXStart, textYUni + (textYMargin * 2))
            const textWidthDate = ctx.measureText('Data de validade: ').width

            ctx.font = '32px sans-serif'
            ctx.fillText('31/12/2025', textXStart + textWidthDate, textYUni + (textYMargin * 2))

            ctx.font = 'bold 32px sans-serif'
            ctx.fillText('Registro de aluno: ', textXStart, textYUni + (textYMargin * 3))
            const textWidthRegistration = ctx.measureText('Registro de aluno: ').width

            ctx.font = '32px sans-serif'
            if (textRA.charAt(0) === '0') {
                ctx.fillText(textRA.slice(1), textXStart + textWidthRegistration, textYUni + (textYMargin * 3))
            } else {
                ctx.fillText(textRA, textXStart + textWidthRegistration, textYUni + (textYMargin * 3))
            }

            if (userPicture) {
                const desiredRatio = 3 / 4
                const img = userPicture

                let cropX = 0
                let cropY = 0
                let cropWidth = img.width
                let cropHeight = img.height

                const currentRatio = img.width / img.height

                if (currentRatio > desiredRatio) {
                    cropWidth = img.height * desiredRatio
                    cropX = (img.width - cropWidth) / 2
                } else {
                    cropHeight = img.width / desiredRatio
                    cropY = (img.height - cropHeight) / 2
                }

                ctx.drawImage(
                    img,
                    cropX, cropY,
                    cropWidth, cropHeight,
                    98, 224,
                    358, 477
                )
            }

            setGenerated(true)
        } catch (finalErr) {
            console.error('Erro geral na geração da imagem:', finalErr)
        }
    }

    const downloadImage = (method: string) => {
        if (!canvasRef.current) return
        
        const link = document.createElement('a')
        switch (method) {
            case 'name':
                link.download = `${name.toUpperCase()}.png`
                break
            case 'code':
                link.download = `${textRA}.png`
                break
            case 'both':
                link.download = `${textRA}-${name.toUpperCase()}.png`
                break
        }
        link.href = canvasRef.current.toDataURL()
        link.click()
    }

    return (
        <main className="ml-64 min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Gerador de Carteirinhas</h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Foto do aluno</label>
                            <label
                                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${isDragging
                                    ? 'border-blue-500 bg-blue-50'
                                    : fileLoad
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                    }`}
                                onDragOver={(event) => handleDrag(event, true)}
                                onDragLeave={(event) => handleDrag(event, false)}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileImage}
                                    className="hidden"
                                />
                                <i className={`text-4xl mb-3 ${fileLoad ? 'fa-solid fa-file-image text-green-500' : 'fa-solid fa-file-import text-gray-400'}`}></i>
                                <span className="text-sm text-gray-600 text-center px-4">{fileName}</span>
                            </label>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Nome do aluno</label>
                            <input
                                type="text"
                                placeholder="Nome do aluno"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">RA</label>
                                <input
                                    type="text"
                                    placeholder="1234567"
                                    value={textRA}
                                    onChange={(event) => setTextRA(event.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Curso do aluno</label>
                                <select
                                    value={course}
                                    onChange={(event) => setCourse(event.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                                >
                                    <option value="">Selecione o curso</option>
                                    <option value="Engenharia de Computação">Engenharia de Computação</option>
                                    <option value="Engenharia de Software">Engenharia de Software</option>
                                    <option value="Análise e Desenvolv. de Sistemas">Análise e Desenvolvimento de Sistemas</option>
                                    <option value="Licenciatura em Matemática">Licenciatura em Matemática</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={generateImage}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
                        >
                            Gerar Carteirinha
                        </button>
                    </div>
                </section>

                <section className={`bg-white rounded-lg shadow-lg p-8 ${generated ? '' : 'hidden'}`}>
                    <div className="flex flex-col items-center space-y-6">
                        <canvas ref={canvasRef} className="max-w-full h-auto border border-gray-200 rounded-lg shadow-md"></canvas>

                        {generated && (
                            <div className="w-full space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Nomear carteirinha por:</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                id="radio-name"
                                                name="download"
                                                value="name"
                                                checked={downloadMethod === 'name'}
                                                onChange={handleDownloadMethod}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">Nome</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                id="radio-code"
                                                name="download"
                                                value="code"
                                                checked={downloadMethod === 'code'}
                                                onChange={handleDownloadMethod}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">RA</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                id="radio-both"
                                                name="download"
                                                value="both"
                                                checked={downloadMethod === 'both'}
                                                onChange={handleDownloadMethod}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">Ambos</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    onClick={() => downloadImage(downloadMethod)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
                                >
                                    Baixar Carteirinha
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
