import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { COLLECTIBLES, MEDALS } from "@/lib/content/collectibles";
import { DEFAULT_SCHOLAR_NAME, OUTFITS, type OutfitId } from "@/lib/content/outfits";
import { useScholar } from "@/lib/store";
import { levelFromXp } from "@/lib/xp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/scholar")({ component: ScholarPage });

function ScholarPage() {
  const store = useScholar();
  const { level, into, next } = levelFromXp(store.xp);
  const [name, setName] = useState(store.displayName);
  const [tab, setTab] = useState<"wardrobe" | "profile" | "settings">("wardrobe");
  const shownName = store.displayName.trim() || DEFAULT_SCHOLAR_NAME;
  const outfit = OUTFITS.find((item) => item.id === store.equippedOutfit) ?? OUTFITS[0];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">Your scholar</p>
        <h1 className="font-display text-4xl font-semibold">{shownName}</h1>
        <p className="mt-2 max-w-2xl text-muted">Wardrobe, medals and the work that earned them.</p>
      </header>

      <Card className="overflow-hidden p-0">
        <div className="grid md:grid-cols-[240px_1fr]">
          <img src={outfit.art} alt={`${shownName} in ${outfit.name}`} className="h-72 w-full object-cover object-[50%_12%] md:h-full" />
          <div className="p-5 md:p-6">
            <p className="text-xs tracking-[0.18em] text-navy uppercase">{outfit.name}</p>
            <h2 className="font-display text-3xl font-semibold">{shownName}</h2>
            <p className="mt-2 text-sm text-muted">
              Level {level} · {store.xp} XP · {into} / {next} to the next level
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Mind {store.latinXp + store.frenchXp + store.bioXp}</Badge>
              <Badge variant="sage">Body {store.bodyXp}</Badge>
              <Badge variant="outline">{store.unlockedOutfits.length} / {OUTFITS.length} outfits</Badge>
            </div>
            <p className="mt-4 text-sm text-muted">{store.studyDays.length} study days recorded in this browser.</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant={tab === "wardrobe" ? "default" : "secondary"} onClick={() => setTab("wardrobe")}>
          Wardrobe
        </Button>
        <Button variant={tab === "profile" ? "default" : "secondary"} onClick={() => setTab("profile")}>
          Profile
        </Button>
        <Button variant={tab === "settings" ? "default" : "secondary"} onClick={() => setTab("settings")}>
          Settings
        </Button>
      </div>

      {tab === "wardrobe" ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OUTFITS.map((item) => {
            const have = store.unlockedOutfits.includes(item.id);
            const equipped = store.equippedOutfit === item.id;
            return (
              <button
                key={item.id}
                type="button"
                disabled={!have}
                onClick={() => store.equipOutfit(item.id as OutfitId)}
                className={cn(
                  "overflow-hidden rounded-xl bg-card text-left shadow-[var(--shadow-border)] transition-transform duration-150 active:scale-[0.98]",
                  have ? "hover:bg-sage" : "opacity-70",
                  equipped && "ring-2 ring-navy",
                )}
              >
                <img
                  src={item.art}
                  alt=""
                  className={cn("h-56 w-full object-cover object-[50%_12%]", !have && "grayscale")}
                />
                <div className="p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted">{have ? item.blurb : item.need}</p>
                  <p className="mt-1 text-xs font-medium tracking-wide text-navy uppercase">
                    {equipped ? "Wearing" : have ? "Tap to wear" : "Locked"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : tab === "profile" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h3 className="font-display text-2xl font-semibold">Scholar’s name</h3>
            <p className="mt-1 text-sm text-muted">
              Stored only in this browser. Changing it does not alter mastery, XP or revision history.
            </p>
            <div className="mt-4 flex gap-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={DEFAULT_SCHOLAR_NAME} maxLength={32} />
              <Button onClick={() => store.setName(name.trim())}>Save name</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setName("");
                  store.setName("");
                }}
              >
                Clear
              </Button>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-display text-2xl font-semibold">Medals</h3>
            <ul className="mt-3 space-y-2">
              {MEDALS.map((medal) => (
                <li key={medal.id} className="flex items-start justify-between gap-3 text-sm">
                  <span>
                    <span className="font-medium">{medal.name}</span>
                    <span className="block text-muted">{medal.blurb}</span>
                  </span>
                  <Badge variant={store.medals.includes(medal.id) ? "default" : "outline"}>
                    {store.medals.includes(medal.id) ? "Earned" : "Locked"}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5 lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold">Collection</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {COLLECTIBLES.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-lg bg-sage/60">
                  <img
                    src={item.art}
                    alt=""
                    className={`h-32 w-full object-cover ${store.collectibles.includes(item.id) ? "" : "grayscale"}`}
                  />
                  <div className="p-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted">
                      {store.collectibles.includes(item.id) ? item.blurb : item.need}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="space-y-5 p-5">
          <h3 className="font-display text-2xl font-semibold">App preferences</h3>
          <label className="flex items-center justify-between gap-4">
            <span>
              <span className="block font-medium">Sound</span>
              <span className="text-sm text-muted">Short chimes on answers and completed sessions.</span>
            </span>
            <Switch checked={store.sound} onCheckedChange={store.setSound} />
          </label>
          <p className="text-sm text-muted">
            This garden lives in your browser. Clearing site data will reset XP, reviews, outfits and the plant.
          </p>
          <Button variant="outline" onClick={() => store.resetAll()}>
            Reset local progress
          </Button>
        </Card>
      )}
    </div>
  );
}
