const pagesArr = ["dashboard", "results", "procedures", "immunizations", "allergies", "medications", "conditions", "monitoring", "fitness", "timeline", "connections"];
const pagesSlot = pagesArr.join("|");

intent(`(Take|Get|Go|Navigate|Bring) (me|) (to|) (my|the|) $(PAGE ${pagesSlot}) (page|)`, 
       `What are (my|the|) $(PAGE ${pagesSlot})`,
       `Show (me|) (my|the|all|) $(PAGE ${pagesSlot})`, p => {
    const page = p.PAGE.value
    if (p.visual.page === page) {
        p.play(`you are currently on the ${page} page`,
               `you are currently on the right page`, //TODO improve responses
               `you are already on the correct page`);
    } else {
        p.play({
            command: 'navigate',
            page
        });
        p.play(`taking you to the ${page} page`);
    }
});
