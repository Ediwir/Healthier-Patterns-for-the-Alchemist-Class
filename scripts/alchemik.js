/**
 * Made by @vauxs
 */

const addHealingTo = [
    "ambrosia-of-undying-hope",
    "artevil-suspension",
    "brewers-regret",
    "curled-cure-gel",
    "dragons-blood-pudding",
    "ladys-blessing-oil",
    "mana-rattler-liniment",
    "sun-orchid-poultice",
    "sun-orchid-elixir",
    "vat-grown-brain",
    "yarrow-root-bandage"
]

Hooks.on("preCreateItem", (item, data) => {
    if (!addHealingTo.includes(data?.system?.slug)) return;

    item.updateSource({ system: { traits: { value: (item?.system?.traits?.value ?? []).concat(['healing']) } } })
    ui.notifications.info(`HPALC | Added healing trait to ${item.name}.`)
})

Hooks.on('ready', () => {
    game.i18n.translations.PF2E.TraitDescriptionCoagulant = "Healing alchemical items with the coagulant trait can be very potent, but lose effectiveness when many are applied in a short period of time. When a creature benefits from a Coagulant effect, it becomes immune to any hit point healing from Coagulant sources for 10 minutes, but receives an ongoing benefit chosen at the time of the item's creation. A creature can only receive one Coagulant benefit at a time - if a new Coagulant effect is applied, the previous one is lost."
})

Hooks.on("renderPickAThingPrompt", (app, html) => {
    if (!app.choices.filter(x => x.value.includes('healthier-patterns-for-the-alchemist-class')).length) return;

    const names = app.choices.map(x => x.label)
    const namesWithStar = names.filter(x => x.includes("*"))
    const duplicates = app.choices.filter(x => {
        if (namesWithStar.includes(`${x.label}*`)) {
            return true
        } else {
            return false
        }
    })

    let i = 0
    for (const { label } of duplicates) {
        setTimeout(() => {
            $(html).find(`:contains('${label}'):not(:contains('*'))`).last().parent().fadeTo(2000, 0.25)
        }, i * 500);

        i++
    }
})
