<template>
  <div>
  <Navigation></Navigation>
  <div class="list row" style="padding-top:20px;">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchName">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Banned Players List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Ban info</h4>
        <div>
          <label><strong>Username:</strong></label> {{ currentTutorial.name }}
        </div>
        <div>
          <label><strong>ID:</strong></label> {{ currentTutorial.rblxid }}
        </div>
        <div>
          <label><strong>Reason:</strong></label> {{ currentTutorial.description  }}
        </div>
        <div>
          <label><strong>Evidence:</strong></label> {{ currentTutorial.evidence  }}
        </div>

        <a class="badge badge-warning"
          :href="'/ban/' + currentTutorial._id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a ban...</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import Navigation from '../components/auth/navbar.vue'
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  components: {
    'Navigation': Navigation
  },
  methods: {
    retrieveBans() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBans();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveBans();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>