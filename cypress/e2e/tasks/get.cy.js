describe("GET /tasks", () => {
	beforeEach(function () {
		cy.fixture("tasks/tasks-get").then(function (tasks) {
			this.tasks = tasks;
		});
	});

	it("get my tasks", function () {
		const { user, tasks } = this.tasks.list;
		cy.task("removeTasksLike", "taref4");
		cy.task("removeUser", user.email);
		cy.postUser(user);
		cy.postSession(user).then((respUser) => {
			tasks.forEach(function (t) {
				cy.postTask(t, respUser.body.token);
			});
			cy.getTasks(respUser.body.token)
				.then((response) => {
					expect(response.status).to.eq(200);
				})
				.its("body")
				.should("be.an", "array");
		});
	});
});

describe("GET /tasks/:id", () => {
	beforeEach(function () {
		cy.fixture("tasks/tasks-get").then(function (tasks) {
			this.tasks = tasks;
		});
	});
	it("get unique taks", function () {
		const { user, task } = this.tasks.unique;
		cy.task("removeTask", task.name, user.email);
		cy.task("removeUser", user.email);
		cy.postUser(user);
		cy.postSession(user).then((respUser) => {
			cy.postTask(task, respUser.body.token).then((taskResp) =>
				cy
					.getUniqueTask(taskResp.body._id, respUser.body.token)
					.then((response) => {
						expect(response.status).to.eq(200);
					})
			);
		});
	});
	it("task not found", function () {
		const { user, task } = this.tasks.not_found;
		cy.task("removeTask", task.name, user.email);
		cy.task("removeUser", user.email);
		cy.postUser(user);
		cy.postSession(user).then((respUser) => {
			cy.postTask(task, respUser.body.token).then((taskResp) => {
				cy.deleteTask(taskResp.body._id, respUser.body.token).then(
					(response) => {
						expect(response.status).to.eq(204);
					}
				);
				cy.getUniqueTask(taskResp.body._id, respUser.body.token).then(
					(response) => {
						expect(response.status).to.eq(404);
					}
				);
			});
		});
	});
});
