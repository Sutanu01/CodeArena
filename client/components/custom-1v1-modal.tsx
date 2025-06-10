"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Zap, Target, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";

interface OneVsOneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const gameModes = [
  {
    duration: 10,
    label: "Quick & Fast",
    description: "Lightning rounds for rapid problem solving",
    icon: Zap,
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    cardClass: "border-orange-200 dark:border-orange-800/30",
  },
  {
    duration: 25,
    label: "Balanced Battle",
    description: "Perfect mix of speed and strategy",
    icon: Target,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/5 dark:text-blue-400",
    cardClass: "border-blue-200 dark:border-blue-800/30",
  },
  {
    duration: 40,
    label: "Deep Dive",
    description: "Extended time for complex algorithms",
    icon: Clock,
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    cardClass: "border-purple-200 dark:border-purple-800/30",
  },
];

export function OneVsOneModal({ isOpen, onClose }: OneVsOneModalProps) {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [useRandomMode, setUseRandomMode] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const router = useRouter();

  const handleStartMatching = async () => {
    const modeDuration : number[]= [10,25,40];
    const mode = useRandomMode ? modeDuration[Math.floor(Math.random() * modeDuration.length)] : selectedMode;
    if (!mode) return;

    setIsMatching(true);

    const params = new URLSearchParams({
      mode: mode.toString(),
    });

    setTimeout(() => {
      router.push(`/matching?${params.toString()}`);
      handleClose();
    }, 1000);
  };

  const handleModeSelect = (duration: number) => {
    setSelectedMode(duration);
    setUseRandomMode(false);
  };

  const handleRandomToggle = () => {
    setUseRandomMode(!useRandomMode);
    if (!useRandomMode) {
      setSelectedMode(null);
    }
  };

  const resetModal = () => {
    setSelectedMode(null);
    setUseRandomMode(false);
    setIsMatching(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const selectedModeData = gameModes.find(
    (mode) => mode.duration === selectedMode
  );
  const canStart = selectedMode !== null || useRandomMode;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="1v1 Coding Battle"
      className="max-w-2xl"
    >
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
          <p className="text-muted-foreground text-sm">
            Choose your battle duration and face off against a worthy opponent
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">
            Select Battle Duration
          </Label>
          <div className="grid gap-3">
            {gameModes.map((mode) => {
              const IconComponent = mode.icon;
              const isSelected =
                selectedMode === mode.duration && !useRandomMode;

              return (
                <Card
                  key={mode.duration}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    mode.cardClass
                  } ${
                    isSelected
                      ? "ring-2 ring-primary bg-primary/5 shadow-md"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleModeSelect(mode.duration)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold">{mode.label}</h3>
                          <Badge className={mode.color}>
                            {mode.duration} mins
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Or Try Your Luck</Label>
          <Card
            className={`cursor-pointer transition-all hover:shadow-md border-dashed ${
              useRandomMode
                ? "ring-2 ring-primary bg-primary/5 shadow-md border-primary"
                : "hover:bg-muted/50 border-muted-foreground/30"
            }`}
            onClick={handleRandomToggle}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      useRandomMode
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <Shuffle className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-semibold">Random Challenge</h3>
                    <Badge variant="outline" className="border-dashed">
                      Surprise!
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Let fate decide your battle duration for an unpredictable
                    challenge
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {(selectedMode || useRandomMode) && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Selected Mode:</span>
              <div className="flex items-center space-x-2">
                {useRandomMode ? (
                  <>
                    <Shuffle className="h-4 w-4" />
                    <span className="font-medium">Random Challenge</span>
                  </>
                ) : selectedModeData ? (
                  <>
                    <selectedModeData.icon className="h-4 w-4" />
                    <span className="font-medium">
                      {selectedModeData.label}
                    </span>
                    <Badge className={selectedModeData.color}>
                      {selectedMode} mins
                    </Badge>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            disabled={isMatching}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartMatching}
            disabled={!canStart || isMatching}
            className="flex-1"
          >
            {isMatching ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Finding Opponent...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Start Matching
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
