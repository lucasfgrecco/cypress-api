describe("POST /session", () => {
	beforeEach(function () {
		cy.fixture("users").then(function (users) {
			this.users = users;
		});
	});

	it("user session", function () {
		const userData = this.users.login;
		cy.task("removeUser", userData.email);
		cy.postUser(userData);
		cy.postSession(userData).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.user.name).to.eq(userData.name);
			expect(response.body.token).not.to.be.empty;
		});
	});
	it("invalid password", function () {
		const userData = this.users.inv_pass;

		cy.postSession(userData).then((response) => {
			expect(response.status).to.eq(401);
		});
	});
	it("email not found", function () {
		const userData = this.users.email_404;

		cy.postSession(userData).then((response) => {
			expect(response.status).to.eq(401);
		});
	});
});
