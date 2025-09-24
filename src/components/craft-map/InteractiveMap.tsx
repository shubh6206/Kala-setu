'use client'

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { craftLocations, type CraftLocation } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';

const InteractiveMap = () => {
    const [activeState, setActiveState] = useState<string | null>(null);

    const craftsByState = craftLocations.reduce((acc: Record<string, CraftLocation>, craft) => {
        acc[craft.state] = craft;
        return acc;
    }, {});

    return (
        <div className="w-full max-w-4xl mx-auto">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 800"
                className="w-full h-auto border rounded-lg bg-background"
            >
                <style>
                    {`
                    .state-path {
                        fill: hsl(var(--muted));
                        stroke: hsl(var(--border));
                        stroke-width: 1;
                        transition: all 0.3s ease;
                    }
                    .state-path.has-craft {()
                        fill: hsl(var(--primary) / 0.1);
                        cursor: pointer;
                    }
                    .state-path.has-craft:hover {
                        fill: hsl(var(--primary) / 0.3);
                        stroke: hsl(var(--primary));
                        stroke-width: 2;
                    }
                    .state-path.active {
                        fill: hsl(var(--primary) / 0.5);
                        stroke: hsl(var(--primary));
                        stroke-width: 2;
                    }
                    `}
                </style>

                {/* India Map Outline */}
                <path
                    d="M200,75 L480,65 L960,70 L980,120 L970,220 L950,320 L920,420 L880,520 L840,620 L780,720 L700,780 L600,790 L500,785 L400,775 L300,750 L200,700 L140,600 L120,500 L130,400 L150,300 L180,200 L200,100 Z"
                    className="state-path"
                    fill="hsl(var(--muted) / 0.15)"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                />

                {/* State Paths */}
                {Object.entries(statesPaths).map(([stateName, pathData]) => {
                    const craft = craftsByState[stateName];
                    const stateHasCraft = !!craft;

                    if (!stateHasCraft) {
                        return (
                            <path
                                key={stateName}
                                id={stateName}
                                d={pathData}
                                className="state-path"
                            >
                                <title>{stateName}</title>
                            </path>
                        );
                    }

                    return (
                        <Popover key={stateName} open={activeState === stateName} onOpenChange={(isOpen) => {
                            setActiveState(isOpen ? stateName : null);
                        }}>
                            <PopoverTrigger asChild>
                                <path
                                    id={stateName}
                                    d={pathData}
                                    className={`state-path has-craft ${activeState === stateName ? 'active' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Explore ${craft.name} from ${stateName}`}
                                >
                                    <title>{stateName} - {craft.name}</title>
                                </path>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-card border shadow-lg">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none font-headline text-lg">{craft.name}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {craft.description}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            📍 {stateName}
                                        </p>
                                    </div>
                                    {craft.artisans.length > 0 && (
                                        <Button asChild variant="default" size="sm" className="w-full">
                                            <Link href={`/artisans/${craft.artisans[0]}`}>
                                                View Artisan Profile
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    );
                })}

                {/* Map Title */}
                <text x="500" y="30" className="text-lg font-bold fill-current" textAnchor="middle">Interactive Craft Map of India</text>
                <text x="500" y="50" className="text-sm fill-current" textAnchor="middle">Click on highlighted states to explore traditional crafts</text>
            </svg>

            {/* Legend */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border bg-muted"></div>
                    <span className="text-muted-foreground">No crafts available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border bg-primary/10"></div>
                    <span className="text-muted-foreground">Crafts available - click to explore</span>
                </div>
            </div>

            {/* Available Crafts Summary */}
            <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                    {Object.keys(craftsByState).length} states with traditional crafts available out of {Object.keys(statesPaths).length} total states and union territories
                </p>
                <p className="text-xs text-muted-foreground">
                    Hover over states to see their names • Click on highlighted states to explore crafts
                </p>
            </div>
        </div>
    );
};

// Simplified but recognizable state paths for India
// Geographically accurate India map with proper state positions
const statesPaths = {
    // Jammu & Kashmir and Ladakh (Northernmost)
    "Jammu and Kashmir": "M200,80 L280,75 L320,90 L340,120 L320,150 L280,140 L240,130 L200,110 Z",
    "Ladakh": "M340,70 L420,65 L460,80 L480,110 L460,140 L420,135 L380,125 L340,120 Z",
    
    // Northern Plains
    "Himachal Pradesh": "M280,140 L340,135 L380,150 L360,180 L320,175 L280,165 Z",
    "Punjab": "M240,165 L280,160 L320,175 L300,200 L260,195 L220,185 Z",
    "Chandigarh": "M270,185 L285,180 L290,195 L275,200 L265,195 Z",
    "Haryana": "M300,200 L360,195 L380,220 L360,245 L320,240 L280,225 Z",
    "Delhi": "M340,220 L355,215 L360,235 L345,240 L335,230 Z",
    "Uttarakhand": "M380,180 L440,175 L460,200 L440,225 L400,220 L380,195 Z",
    "Uttar Pradesh": "M360,245 L500,240 L540,265 L520,320 L480,325 L440,310 L400,295 L360,280 Z",
    
    // Western States
    "Rajasthan": "M180,225 L360,220 L380,280 L360,360 L320,400 L280,380 L240,340 L200,300 L160,260 Z",
    "Gujarat": "M160,380 L280,375 L320,400 L300,480 L260,500 L220,480 L180,440 L140,400 Z",
    "Dadra and Nagar Haveli and Daman and Diu": "M240,460 L260,455 L270,475 L255,485 L240,480 Z",
    "Maharashtra": "M280,440 L440,435 L480,460 L460,540 L420,560 L380,540 L340,520 L300,500 Z",
    "Goa": "M340,560 L380,555 L395,580 L380,600 L365,595 L350,575 Z",
    
    // Central India
    "Madhya Pradesh": "M360,360 L520,355 L560,380 L540,460 L500,480 L460,460 L420,440 L380,420 L340,400 Z",
    "Chhattisgarh": "M540,380 L620,375 L660,400 L640,480 L600,500 L560,480 L540,460 Z",
    
    // Eastern States
    "Bihar": "M520,320 L620,315 L660,340 L640,380 L600,385 L560,370 L520,355 Z",
    "Jharkhand": "M560,385 L640,380 L680,405 L660,460 L620,465 L580,450 L560,425 Z",
    "West Bengal": "M640,340 L720,335 L760,360 L740,420 L700,440 L660,420 L640,380 Z",
    "Odisha": "M620,465 L700,460 L740,485 L720,545 L680,565 L640,545 L620,505 Z",
    "Sikkim": "M720,315 L740,310 L750,330 L735,340 L720,335 Z",
    
    // Northeastern States
    "Assam": "M740,360 L840,355 L880,380 L860,420 L820,425 L780,405 L740,385 Z",
    "Arunachal Pradesh": "M840,320 L920,315 L960,340 L940,380 L900,385 L860,365 L840,345 Z",
    "Nagaland": "M860,420 L900,415 L920,440 L905,465 L885,460 L865,445 Z",
    "Manipur": "M885,460 L915,455 L930,480 L915,505 L895,500 L880,485 Z",
    "Mizoram": "M865,500 L895,495 L910,520 L895,545 L875,540 L860,525 Z",
    "Tripura": "M740,440 L770,435 L785,460 L770,485 L750,480 L735,465 Z",
    "Meghalaya": "M780,405 L820,400 L840,425 L820,450 L800,445 L785,430 Z",
    
    // Southern States
    "Telangana": "M480,540 L560,535 L580,570 L560,605 L520,610 L480,595 L460,575 Z",
    "Andhra Pradesh": "M580,570 L680,565 L720,590 L700,650 L660,670 L620,650 L580,630 L560,605 Z",
    "Karnataka": "M380,600 L480,595 L520,620 L500,680 L460,700 L420,680 L380,660 L360,640 Z",
    "Tamil Nadu": "M500,680 L620,675 L660,700 L640,760 L600,780 L560,760 L520,740 L480,720 Z",
    "Kerala": "M360,680 L420,675 L440,700 L420,760 L400,780 L380,760 L360,740 L340,720 Z",
    "Puducherry": "M580,720 L600,715 L610,735 L595,745 L580,740 Z",
    
    // Island Territories
    "Lakshadweep": "M200,720 L220,715 L230,735 L215,745 L200,740 Z",
    "Andaman and Nicobar Islands": "M780,700 L800,695 L810,715 L805,735 L795,740 L785,735 L775,715 Z"
};

export default InteractiveMap;