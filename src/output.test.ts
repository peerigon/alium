import { say, error } from "./output";

describe("output.ts", () => {
	const originalLog = console.log;
	const logMock = jest.fn(s => originalLog(s));
	global.console.log = logMock;

	it("should console.log", () => {
		say("say");
		error("error");
		expect(logMock.mock.calls).toMatchSnapshot();
	});
});
