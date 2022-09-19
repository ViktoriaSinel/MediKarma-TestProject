const HELP_HOW = [
    "What (question|questions|command|commands|) (should I|can I|do I|am I supposed to|to) (ask|say|do|type|enter|write|give) (here|)",
    "What (question|questions|command|commands) (can|do|will) you (answer|handle|do|support|give an answer to)",
    "What (question|questions|command|commands) (is|are) (available|supported|allowed) (to be asked|) (here|)",
    "(Can you|Will you|I need|) (help|support) (me|) (please|)",
    "(Can|Should) I (ask|tell|say) (you|) (a question|something|anything)",
    "How (do|does|should|is|are|) (it|you|this|that|this thing) (supposed to|) (work|works|working|operate|function)",
    "How (do I|should I|to) use (it|you|this|that|this thing)",
    "How (do I|should I|to) (work|get an answer) (here|)",
];

const HELP_WHAT = [
    "(What is|What's) (that|it)",
    "(Who|What) are you",
    "(Do|Does) (you|it|this|that) (thing|) work",
];

intent(HELP_HOW, p => {
    let page = p.visual.page;
    switch (page) {
        default:
            p.play("(Just say|Say|You can say): (what is my blood pressure|what is my body mass index|what was my latest basal metabolic rate|what is my hba1c), or ask me a question, for example: (can stress cause hypertension|how can I check my blood pressure|how do I prevent diabetes|is low glucose level dangerous)");
    }
});

intent(HELP_WHAT, p => {
    let page = p.visual.page;
    switch (page) {
        default:
            p.play("I am your virtual health assistant. (You can|) ask me common health questions or say: (what is my blood pressure|what is my body mass index|what was my latest basal metabolic rate|what is my hba1c)");
    }
});