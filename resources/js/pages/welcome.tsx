import React, { useState } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface CalculationResult {
    cubicFeet: number;
    cubicYards: number;
    bags60lb: number;
    bags80lb: number;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [result, setResult] = useState<CalculationResult | null>(null);

    const calculateConcrete = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const d = parseFloat(depth);

        if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) {
            return;
        }

        const cubicFeet = l * w * d;
        const cubicYards = cubicFeet / 27;
        const bags60lb = Math.ceil(cubicYards * 60);
        const bags80lb = Math.ceil(cubicYards * 45);

        setResult({
            cubicFeet,
            cubicYards,
            bags60lb,
            bags80lb
        });
    };

    const clearCalculation = () => {
        setLength('');
        setWidth('');
        setDepth('');
        setResult(null);
    };

    return (
        <>
            <Head title="🏗️ ConCrete Calculator - Construction Material Estimator">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=mono:400,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-zinc-900 text-zinc-100" style={{ fontFamily: 'mono, monospace' }}>
                {/* Header */}
                <header className="border-b-4 border-zinc-700 bg-zinc-800 p-4">
                    <nav className="mx-auto flex max-w-6xl items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-emerald-600 flex items-center justify-center text-zinc-900 font-bold">
                                🏗️
                            </div>
                            <h1 className="text-xl font-bold tracking-tight">ConCrete Calculator</h1>
                        </div>
                        <div className="flex gap-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-zinc-700 px-4 py-2 font-bold uppercase tracking-wide hover:bg-zinc-600 transition-colors border-2 border-zinc-600"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="bg-transparent border-2 border-zinc-600 px-4 py-2 font-bold uppercase tracking-wide hover:bg-zinc-700 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-emerald-600 text-zinc-900 px-4 py-2 font-bold uppercase tracking-wide hover:bg-emerald-500 transition-colors border-2 border-emerald-600"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="bg-zinc-800 border-b-4 border-zinc-700 py-16">
                    <div className="mx-auto max-w-6xl px-4">
                        <div className="text-center">
                            <h1 className="mb-6 text-5xl font-bold tracking-tight">
                                CONSTRUCTION
                                <span className="block text-emerald-400">MATERIAL ESTIMATOR</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-zinc-300 leading-relaxed">
                                Calculate concrete volume for slabs, footings, and pours with precision. 
                                Get accurate estimates for your construction projects.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Calculator Section */}
                <main className="py-16">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Input Form */}
                            <div className="bg-zinc-800 border-4 border-zinc-700 p-8">
                                <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide border-b-2 border-zinc-700 pb-2">
                                    📏 Dimensions
                                </h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wide text-zinc-400 mb-2">
                                            Length (feet)
                                        </label>
                                        <input
                                            type="number"
                                            value={length}
                                            onChange={(e) => setLength(e.target.value)}
                                            className="w-full bg-zinc-900 border-2 border-zinc-600 p-4 text-xl font-bold focus:border-emerald-500 focus:outline-none"
                                            placeholder="0"
                                            step="0.1"
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wide text-zinc-400 mb-2">
                                            Width (feet)
                                        </label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => setWidth(e.target.value)}
                                            className="w-full bg-zinc-900 border-2 border-zinc-600 p-4 text-xl font-bold focus:border-emerald-500 focus:outline-none"
                                            placeholder="0"
                                            step="0.1"
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wide text-zinc-400 mb-2">
                                            Depth (feet)
                                        </label>
                                        <input
                                            type="number"
                                            value={depth}
                                            onChange={(e) => setDepth(e.target.value)}
                                            className="w-full bg-zinc-900 border-2 border-zinc-600 p-4 text-xl font-bold focus:border-emerald-500 focus:outline-none"
                                            placeholder="0"
                                            step="0.1"
                                            min="0"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={calculateConcrete}
                                            className="flex-1 bg-emerald-600 text-zinc-900 py-4 px-6 font-bold uppercase tracking-wide hover:bg-emerald-500 transition-colors border-2 border-emerald-600"
                                            disabled={!length || !width || !depth}
                                        >
                                            Calculate
                                        </button>
                                        <button
                                            onClick={clearCalculation}
                                            className="bg-zinc-700 py-4 px-6 font-bold uppercase tracking-wide hover:bg-zinc-600 transition-colors border-2 border-zinc-600"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="bg-zinc-800 border-4 border-zinc-700 p-8">
                                <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide border-b-2 border-zinc-700 pb-2">
                                    📊 Results
                                </h2>

                                {result ? (
                                    <div className="space-y-6">
                                        <div className="bg-zinc-900 border-2 border-emerald-600 p-4">
                                            <div className="text-sm font-bold uppercase tracking-wide text-emerald-400 mb-1">
                                                Volume
                                            </div>
                                            <div className="text-3xl font-bold">
                                                {result.cubicYards.toFixed(2)} yd³
                                            </div>
                                            <div className="text-zinc-400">
                                                {result.cubicFeet.toFixed(2)} ft³
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-300">
                                                Material Estimates
                                            </h3>
                                            
                                            <div className="bg-zinc-900 border-2 border-zinc-600 p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold">60lb Bags</span>
                                                    <span className="text-xl font-bold text-emerald-400">
                                                        {result.bags60lb}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="bg-zinc-900 border-2 border-zinc-600 p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold">80lb Bags</span>
                                                    <span className="text-xl font-bold text-emerald-400">
                                                        {result.bags80lb}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🧮</div>
                                        <p className="text-zinc-400 text-lg">
                                            Enter dimensions to calculate concrete volume
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section className="bg-zinc-800 border-t-4 border-zinc-700 py-16">
                    <div className="mx-auto max-w-6xl px-4">
                        <h2 className="mb-12 text-3xl font-bold uppercase tracking-wide text-center">
                            Why Use ConCrete Calculator?
                        </h2>
                        
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="bg-zinc-900 border-2 border-zinc-700 p-6 text-center">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Fast</h3>
                                <p className="text-zinc-400">
                                    Instant calculations for concrete volume and material estimates
                                </p>
                            </div>

                            <div className="bg-zinc-900 border-2 border-zinc-700 p-6 text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Accurate</h3>
                                <p className="text-zinc-400">
                                    Precise calculations based on industry-standard formulas
                                </p>
                            </div>

                            <div className="bg-zinc-900 border-2 border-zinc-700 p-6 text-center">
                                <div className="text-4xl mb-4">💪</div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Reliable</h3>
                                <p className="text-zinc-400">
                                    Professional-grade tool for contractors and DIY builders
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-zinc-900 border-t-4 border-zinc-700 py-8">
                    <div className="mx-auto max-w-6xl px-4 text-center">
                        <p className="text-zinc-400">
                            Built with 💚 for the construction industry
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}