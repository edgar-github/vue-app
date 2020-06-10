<template>
  <div>
    <div v-if="loaderShow" id="loader">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="home col-6 mx-auto py-5 mt-5">
      <h1 class="text-center">Create Resume</h1>
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="firstname">Firstname:</label>
            <input
                    type="text"
                    v-model="form.firstname"
                    class="form-control"
                    id="firstname"
            />
            <span class="text-danger" v-if="errors.firstname">
            {{ errors.firstname[0] }}
          </span>
          </div>
          <div class="form-group">
            <label for="lastname">Lastname:</label>
            <input
                    type="text"
                    v-model="form.lastname"
                    class="form-control"
                    id="lastname"
            />
            <span class="text-danger" v-if="errors.lastname">
            {{ errors.lastname[0] }}
          </span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
                type="email"
                v-model="form.email"
                class="form-control"
                id="email"
            />
            <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
          </div>
          <div class="form-group">
            <label for="email">Phone</label>
            <input
                type="number"
                v-model="form.phone"
                class="form-control"
                id="phone"
            />
            <span class="text-danger" v-if="errors.phone">
            {{ errors.phone[0] }}
          </span>
          </div>
          <div class="form-group">
            <label for="email">Address</label>
            <input
                type="text"
                v-model="form.address"
                class="form-control"
                id="address"
            />
            <span class="text-danger" v-if="errors.address">
            {{ errors.address[0] }}
          </span>
          </div>
          <div class="form-group">
            <label for="birth_day">Birthday:</label>
            <input
                type="date"
                v-model="form.birth_day"
                class="form-control"
                id="birth_day"
            />
            <span class="text-danger" v-if="errors.birth_day">
            {{ errors.birth_day[0] }}
          </span>
          </div>

          <div v-for="(ed, index) in form.educations" :key="`education-${index}`" class="form-group multiple-items clearfix">
            <label for="educations">Education: {{ index + 1 }}</label>
            <input
                v-model="ed.name"
                class="form-control education"
                :class="[index < 1 ? multipleFirstItem : '']"
                type="text"
            />
            <span class="text-danger" v-if="errors.educations">
            {{ errors.educations[0] }}
          </span>
            <button v-if="index > 0" @click="form.educations.splice(index, 1)" class="btn btn-danger remove-item" type="button" >Remove</button>
          </div>

          <button @click="form.educations.push({name: ''})" class="btn btn-primary" type="button">ADD Education</button>


          <div v-for="(ed, index) in form.experiences" :key="`experience-${index}`" class="form-group multiple-items clearfix">
            <label for="Experience">Experience: {{ index + 1 }}</label>
            <input
                v-model="ed.name"
                :class="[index < 1 ? multipleFirstItem : '']"
                class="form-control experience"
                type="text"
            />
            <span class="text-danger" v-if="errors.experiences">
            {{ errors.experiences[0] }}
          </span>

            <button v-if="index > 0" @click="form.experiences.splice(index, 1)" class="btn btn-danger remove-item" type="button">Remove</button>
          </div>

          <button @click="form.experiences.push({name: ''})" class="btn btn-primary" type="button">ADD Experience</button>

          <div v-for="(ed, index) in form.languageSkills" :key="`language-${index}`" class="form-group multiple-items clearfix">
            <label for="Language">Language: {{ index + 1 }}</label>
            <input
                v-model="ed.name"
                :class="[index < 1 ? multipleFirstItem : '']"
                class="form-control language"
                type="text"
            />
            <span class="text-danger" v-if="errors.languageSkills">
            {{ errors.languageSkills[0] }}
          </span>

            <button v-if="index > 0" @click="form.languageSkills.splice(index, 1)" class="btn btn-danger remove-item" type="button">Remove</button>
          </div>

          <button @click="form.languageSkills.push({name: ''})" class="btn btn-primary" type="button">ADD Language</button>

        </div>

        <br>
        <div class="text-center">
          <button
              type="submit"
              @click.prevent="createResume"
              class="btn btn-success btn-block"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        birth_day: "",
        educations: [
          {name: ''}
        ],
        languageSkills: [
          {name: ''}
        ],
        experiences: [
          {name: ''}
        ],
      },
      errors: [],
      multipleFirstItem: 'multiple-first-item',
      loaderShow: false,
      apiUrl: 'http://127.0.0.1:8881/api/downloadPDF',
    };
  },

  methods: {
      createResume() {
        this.loaderShow = true;
          User.resume(this.form)
              .then(response => {
                this.loaderShow = false;
                window.location.href = `${this.apiUrl}/${response.data}`;
                console.log(response.data);
                  this.$router.push({ name: "Home" });
              })
              .catch(error => {
                this.loaderShow = false;
                  if (error.response.status === 422) {
                      this.errors = error.response.data.errors;
                  }
              });
      },
  }

};
</script>

<style>
  .education, .experience, .language {
    float: left;
    display: inline-block;
    max-width: 600px;
  }

  .remove-item {
    float: right;
    margin-bottom: 25px;
  }

  .multiple-items label{
    display: block;
  }

  .multiple-first-item{
   max-width: 100%;
  }

  #loader {
    position: fixed;
    width: 100%;
    background: #3737377a;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
  }

  #loader div{
    position: absolute;
    left: 50%;
    top: 50%;
  }



</style>