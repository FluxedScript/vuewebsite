<template>
  <div>
    <Navigation></Navigation>
  
  <div class="submit-form">
    
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="ban.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="ban.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import Navigation from '../components/auth/navbar.vue'
export default {
  name: "add-tutorial",
  data() {
    return {
      ban: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  components: {
    'Navigation': Navigation
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.ban.title,
        description: this.ban.description
      };

      TutorialDataService.create(data)
        .then(response => {
          this.ban.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.ban = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>