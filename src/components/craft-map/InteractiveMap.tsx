'use client';

import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { craftLocations, type CraftLocation } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';
import IndiaMap from './IndiaMap';

const InteractiveMap = () => {
  const [activeState, setActiveState] = useState<string | null>(null);

  const craftsByState = craftLocations.reduce(
    (acc: Record<string, CraftLocation>, craft) => {
      acc[craft.state] = craft;
      return acc;
    },
    {},
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="w-full h-auto border rounded-lg bg-background">
        <IndiaMap
          onClick={(state) => {
            if (craftsByState[state]) {
              setActiveState(state);
            }
          }}
          activeState={activeState}
          hasCraft={(state) => !!craftsByState[state]}
        >
          {(state) => {
            const craft = craftsByState[state];
            if (!craft) return null;
            return (
              <Popover
                key={state}
                open={activeState === state}
                onOpenChange={(isOpen) => {
                  setActiveState(isOpen ? state : null);
                }}
              >
                <PopoverTrigger asChild>
                  <g>
                    {/* This is a dummy trigger, the real one is in the map */}
                  </g>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-card border shadow-lg">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none font-headline text-lg">
                        {craft.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {craft.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        📍 {state}
                      </p>
                    </div>
                    {craft.artisans.length > 0 && (
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="w-full"
                      >
                        <Link href={`/artisans/${craft.artisans[0]}`}>
                          View Artisan Profile
                        </Link>
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }}
        </IndiaMap>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border bg-muted"></div>
          <span className="text-muted-foreground">No crafts available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border bg-primary/10"></div>
          <span className="text-muted-foreground">
            Crafts available - click to explore
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
