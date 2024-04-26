from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(5, 15)
    base_url = "https://prjobs-ceb2ebdcde23.herokuapp.com/"

    @task
    def view_homepage(self):
        self.client.get("/")

    @task
    def login(self):
        self.client.post("/api/users/login", json={"user_email": "diego.cintron1@upr.edu", "user_password": "diego"})

    @task
    def get_posts(self):
        self.client.get("/api/postings")
        
    @task
    def get_example_post(self):
        self.client.get("/api/postings/16")

    @task
    def get_users(self):
        self.client.get("/api/users")
        
    @task
    def get_users(self):
        self.client.get("/api/messages")
        
    @task
    def get_users(self):
        self.client.get("/conversation/1/2")

    @task
    def geolocation(self):
        self.client.post("/api/geocode", json={"address": "2J58+HJ2, Plaza Prados del Sur Shopping Center, PR-153, Santa Isabel, 00757"})