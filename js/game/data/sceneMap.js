var sceneMap = {
	intro: {
		scene: "intro",
		data: require('../scenes/intro/data'),
		paths: {
			next: "test1"
		},
		items: null,
		interactions: null,
		characters: null,
		input: {
			type: "button",
			config: {
				key: 32
			}
		},
		view: {
			html: 'shared.text',
			view: 'text',
			container: '#sceneContainer',
			screen: '#textcreen'
		}
	},
	test1: {
		scene: "test1",
		data: require('../scenes/test1/data'),
		paths: null,
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
		}
	},
	test2: {
		scene: "test2",
		data: require('../scenes/test2/data'),
		paths: null,
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
		}
	}
};

module.exports = sceneMap;