var sceneMap = {
	intro: {
		scene: "intro",
		data: require('../scenes/intro/data'),
		paths: {
			next: "intro_end_path"
		},
		items: null,
		interactions: null,
		characters: null,
		input: {
			type: "button",
			config: {
				key: 32,
				command: "continue"
			}
		},
		view: {
			html: 'shared.text',
			view: 'text',
			container: '#sceneContainer',
			screen: '#textscreen'
		},
		state: {
			content: "intro",
			position: 0
		}
	},
	test1: {
		scene: "test1",
		data: require('../scenes/test1/data'),
		paths: {
			forward: {
				object: "path",
				leadsTo: "test2",
				description: "Go to test2!"
			},
			back: false
		},
		items: null,
		interactions: null,
		characters: null,
		input: {
			type: "command",
			config: null
		},
		view: {
			html: 'shared.terminal',
			view: 'terminal',
			container: '#sceneContainer',
			screen: '#terminalscreen'
		},
		state: null
	},
	test2: {
		scene: "test2",
		data: require('../scenes/test2/data'),
		paths: {
			forward: {
				object: "path",
				leadsTo: "intro",
				description: "Go back to intro!"
			},
			back: true
		},
		items: null,
		interactions: null,
		characters: null,
		input: {
			type: "command",
			config: null
		},
		view: {
			html: 'shared.terminal',
			view: 'terminal',
			container: '#sceneContainer',
			screen: '#terminalscreen'
		},
		state: null
	}
};

module.exports = sceneMap;