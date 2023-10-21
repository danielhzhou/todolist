import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon,
	Code,
} from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { MoonStars, Sun, Trash } from 'tabler-icons-react';

import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);

	const randomTitles = [
		"Do 10 jumping jacks. NOW.",
		"Go touch grass",
		"Go take a shower",
		"Solve a math problem",
		"Go wash the dishes",
		"Go cook Dinner",
		"Go text your mom",
		"Find the derivative of ln(e^(tan(x)))",
		"Chug one can of soda (of your choice)",
		"Call your best friend and start ranting",
		"Wash the rice",
		"Clean out your closet and donate clothes you no longer wear.",
		"Go for a 30-minute walk in your neighborhood.",
		"Organize your desk or workspace.",
		"Try a new recipe for dinner.",
		"Read a book or start a new one.",
		"Write in a journal for 15 minutes.",
		"Call or video chat with a friend or family member.",
		"Try a new hobby or craft.",
		"Watch a documentary or educational video.",
		"Declutter your kitchen and throw away expired items.",
		"Practice mindfulness or meditation for 10 minutes.",
		"Exercise for 20 minutes.",
		"Plan a future trip or vacation.",
		"Learn a new word in a foreign language.",
		"Complete a DIY home improvement project.",
		"Sort and organize your email inbox.",
		"Write a thank-you note to someone you appreciate.",
		"Do a random act of kindness for a stranger.",
		"Create a budget or financial plan.",
		"Set a new personal or professional goal.",
		"Attempt to break a world record for the most jumping jacks in one minute.",
		"Have a dance party in your living room to your favorite music.\n",
		"Try to touch your toes without bending your knees (regardless of flexibility).\n",
		"Build a fort out of blankets and pillows and have a nap inside.",
		"See how many marshmallows you can fit in your mouth at once (safety first!).\n",
		"Pretend you're a sports announcer and provide commentary for your everyday activities.\n",
		"Create a silly, made-up language and have a conversation in it.\n",
		"Put on a fashion show with the most outrageous outfits you can find in your closet.\n",
		"Try to balance a spoon on your nose for as long as possible.\n",
		"Have a staring contest with your pet (or a houseplant) and see who blinks first.\n",
		"Attempt to juggle random objects you find around the house.\n",
		"Create a new and ridiculous hairstyle for yourself.\n",
		"Arrange your food on a plate to look like a work of art before eating it.\n",
		"Try to touch your nose with your tongue (even if it's impossible).\n",
		"Write a short, absurd poem about a rubber chicken.\n",
		"Make funny faces in the mirror for at least five minutes.\n",
		"Try to hula hoop and see how long you can keep it going.\n",
		"Invent a superhero persona and give yourself a superhero name.\n",
		"Pretend you're a news anchor reporting on the latest alien sightings in your backyard.\n",
		"Challenge your friends to a friendly competition.\n",
		"Try to have a serious conversation with your pet.\n",
		"Invent a new conspiracy theory.\n",
		"See how many water bottles you can balance on your head\n",
		"Hold a one-person talent show and showcase your most unusual talent.\n",
		"Convince yourself you're a secret agent on a top-secret mission while doing chores.\n",
		"Set up a mock press conference for your favorite inanimate object.\n",
		"Try to sing your favorite song while drinking a glass of water without spilling a drop. \n",
		"Pretend you're a stand-up comedian and perform a comedy routine for your houseplants. \n",
		"Try to balance a spoon on your nose for as long as possible.",
		"Have a staring contest with your pet (or a houseplant) and see who blinks first.",
		"Attempt to juggle random objects you find around the house.",
		"Create a new and ridiculous hairstyle for yourself.",
		"Arrange your food on a plate to look like a work of art before eating it.",
		"Try to touch your nose with your tongue (even if it's impossible).",
		"Write a short, absurd poem about a rubber chicken.",
		"Make funny faces in the mirror for at least five minutes.",
		"Try to hula hoop and see how long you can keep it going.",
		"Invent a superhero persona and give yourself a superhero name."
	  ];

	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	const taskTitle = useRef('');
	const taskSummary = useRef('');

	function createTask() {
		setTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskSummary.current.value,
			},
		]);

		saveTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskSummary.current.value,
			},
		]);
	}

function deleteTask(index) {
  const clonedTasks = [...tasks];
  clonedTasks.splice(index, 1);

  // Create three more tasks with a 50% probability
  if (Math.random() < 0.5) {
    for (let i = 0; i < 3; i++) {
	const randomTitle = randomTitles[Math.floor(Math.random() * randomTitles.length)];
    clonedTasks.push({
        title: randomTitle,
        summary: ``,
      	});
    	}
  	}

  	setTasks(clonedTasks);
  	saveTasks(clonedTasks);
	}


	function loadTasks() {
		let loadedTasks = localStorage.getItem('tasks');

		let tasks = JSON.parse(loadedTasks);

		if (tasks) {
			setTasks(tasks);
		}
	}

	function saveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function resetTasks() {
		// Clear the tasks array
		setTasks([]);
		// Also, clear the tasks from local storage
		saveTasks([]);
	  }

	useEffect(() => {
		loadTasks();
	}, []);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ colorScheme, defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>
					<Modal
						opened={opened}
						size={'md'}
						title={'New Task'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
						}}
						centered>
						<TextInput
							mt={'md'}
							ref={taskTitle}
							placeholder={'Task Title'}
							required
							label={'Title'}
						/>
						<TextInput
							ref={taskSummary}
							mt={'md'}
							placeholder={'Task Summary'}
							label={'Summary'}
						/>
						<Group mt={'md'} position={'apart'}>
							<Button
								onClick={() => {
									setOpened(false);
								}}
								variant={'subtle'}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									createTask();
									setOpened(false);
								}}>
								Create Task
							</Button>
						</Group>
					</Modal>
					<Container size={800} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 900,
								})}>
								My Tasks
							</Title>
							<ActionIcon
								color={'blue'}
								onClick={() => toggleColorScheme()}
								size='lg'>
								{colorScheme === 'dark' ? (
									<Sun size={16} />
								) : (
									<MoonStars size={16} />
								)}
							</ActionIcon>
						</Group>
						{tasks.length > 0 ? (
							tasks.map((task, index) => {
								if (task.title) {
									return (
										<Card withBorder key={index} mt={'sm'} >
											<Group position={'apart'}>
												<Text weight={'bold'}>{task.title}</Text>
												<ActionIcon
													onClick={() => {
														deleteTask(index);
													}}
													color={'red'}
													variant={'transparent'}>
													<Trash style ={{ justifyContent: 'right' }}/>
												</ActionIcon>
											</Group>
											<Text color={'dimmed'} size={'md'} mt={'sm'}>
												{task.summary
													? task.summary
													: 'No summary was provided for this task'}
											</Text>
										</Card>
									);
								}
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no tasks
							</Text>
						)}
						<Button
							onClick={() => {
								setOpened(true);
							}}
							fullWidth
							mt={'md'}>
							New Task
						</Button>
						<Button
							onClick={() => resetTasks()}
							variant="outline"
							color="red"
							fullWidth
							mt="md"
							>
							Reset Tasks
							</Button>
					</Container>
				</div>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
