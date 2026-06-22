import random

PARAGRAPHS = [
    (
        "The rapid advancement of artificial intelligence is reshaping the way we "
        "live and work. Machines can now recognize speech, translate languages, and "
        "even generate creative content with remarkable accuracy. As these systems "
        "grow more capable, the line between human and machine intelligence continues "
        "to blur, raising profound questions about the future of work and creativity."
    ),
    (
        "Deep within the Amazon rainforest, thousands of undiscovered species still "
        "await scientific documentation. The dense canopy filters sunlight into soft, "
        "green-tinted beams that illuminate the forest floor. Every square kilometer "
        "teems with insects, reptiles, and mammals that have evolved intricate "
        "relationships over millions of years. Preserving this biodiversity is one "
        "of the greatest ecological challenges of our time."
    ),
    (
        "The universe is estimated to be approximately thirteen point eight billion "
        "years old, yet humanity has only been observing the cosmos with telescopes "
        "for a few centuries. Light from distant galaxies takes billions of years to "
        "reach us, meaning we are essentially looking back in time whenever we gaze "
        "at the night sky. The sheer scale of existence is both humbling and inspiring."
    ),
    (
        "The Renaissance was a period of extraordinary cultural and intellectual "
        "rebirth that swept through Europe from the fourteenth to the seventeenth "
        "century. Artists like Leonardo da Vinci and Michelangelo pushed the "
        "boundaries of human expression, while scientists such as Galileo and "
        "Copernicus challenged long-held beliefs about the natural world. This era "
        "laid the groundwork for modern science, philosophy, and art."
    ),
    (
        "Writing clean code is an art that every programmer strives to master. "
        "Meaningful variable names, concise functions, and thoughtful comments "
        "transform a tangled mess of logic into something readable and maintainable. "
        "Great software is not just about making things work — it is about crafting "
        "solutions that other developers can understand, extend, and trust for years "
        "to come."
    ),
    (
        "Philosophers have long debated the nature of reality and our ability to "
        "perceive it accurately. Plato argued that the physical world is merely a "
        "shadow of a higher realm of perfect forms, while Descartes famously reduced "
        "certainty to a single statement: I think, therefore I am. These ancient "
        "questions remain as compelling today as they were thousands of years ago, "
        "guiding inquiry in science, ethics, and the arts."
    ),
    (
        "The marathon is one of the most demanding tests of human endurance, covering "
        "a distance of just over forty two kilometers. Elite runners complete the "
        "course in slightly over two hours, sustaining a pace that most people cannot "
        "maintain for even a few minutes. Training for a marathon requires months of "
        "dedicated effort, careful nutrition, and mental resilience that extends far "
        "beyond the physical boundaries of the race itself."
    ),
    (
        "Music has accompanied human civilization since its earliest days, evolving "
        "from simple rhythmic drumbeats to the complex symphonies of Beethoven and "
        "beyond. It transcends language, conveying emotion and meaning in ways that "
        "words alone cannot. Whether it is the gentle strum of an acoustic guitar "
        "or the thundering bass of an electronic festival, music has the remarkable "
        "power to unite people across cultures and generations."
    ),
    (
        "Climate change is one of the defining challenges of the twenty-first century. "
        "Rising global temperatures are melting polar ice caps, intensifying storms, "
        "and disrupting ecosystems worldwide. Scientists warn that without significant "
        "reductions in greenhouse gas emissions, the consequences will be both "
        "widespread and irreversible. Transitioning to renewable energy sources and "
        "adopting sustainable practices are crucial steps toward a more stable future."
    ),
    (
        "Great literature has the power to transport readers to worlds they have "
        "never visited and introduce them to lives they have never lived. A skilled "
        "author weaves together plot, character, and language into an experience "
        "that resonates long after the final page is turned. From the tragedies of "
        "Shakespeare to the modernist experiments of Virginia Woolf, storytelling "
        "remains one of humanity's most enduring and powerful art forms."
    ),
    (
        "Supply and demand is the cornerstone of modern economic theory. When the "
        "supply of a good decreases while demand remains constant, prices tend to "
        "rise; conversely, an oversupply typically drives prices downward. These "
        "forces interact constantly in markets around the world, influencing "
        "everything from the cost of groceries to the value of currencies traded "
        "on international exchanges every single day."
    ),
    (
        "The human brain is capable of extraordinary feats of memory, creativity, "
        "and problem-solving, yet it is also susceptible to a wide range of "
        "cognitive biases. Confirmation bias leads us to favor information that "
        "supports our existing beliefs, while the availability heuristic causes "
        "us to overestimate the likelihood of events we can easily recall. "
        "Understanding these mental shortcuts is the first step toward more "
        "rational and effective decision-making."
    ),
    (
        "Architecture is the silent storyteller of human civilization. Every "
        "building reflects the values, technology, and aesthetic sensibilities "
        "of the era in which it was constructed. The soaring Gothic cathedrals "
        "of medieval Europe expressed both religious devotion and engineering "
        "ambition, while the glass-and-steel skyscrapers of the modern city "
        "symbolize commerce, innovation, and the relentless drive toward the sky."
    ),
    (
        "Regular physical exercise is one of the most powerful tools available "
        "for maintaining long-term health. Studies consistently show that even "
        "moderate activity — such as thirty minutes of brisk walking five times "
        "a week — can significantly reduce the risk of heart disease, diabetes, "
        "and depression. The benefits extend beyond the physical, sharpening "
        "focus, improving sleep quality, and boosting overall mood and well-being."
    ),
    (
        "The internet has fundamentally changed the way information is created, "
        "shared, and consumed. In the span of a few decades, it has evolved from "
        "a small academic network into a global infrastructure that connects "
        "billions of people. Social media platforms allow ideas to spread "
        "instantly across continents, empowering individuals while also creating "
        "new challenges around privacy, misinformation, and digital well-being."
    ),
]

def get_random_paragraph() -> str:
    return random.choice(PARAGRAPHS)

def get_paragraph_count() -> int:
    return len(PARAGRAPHS)
