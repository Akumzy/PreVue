<template>
  <!-- <button class="save-icon" >SAVE PROJECT</button> -->
  <button @click="saveProjectJSON">
    <i class="fas fa-save fa-lg"></i>

    <br />
    <span class="white--text">Save Project</span>
  </button>
</template>

<script>
import localforage from 'localforage';
import fs from 'fs-extra';
const Mousetrap = require('mousetrap');

const ipc = require('electron').ipcRenderer;

export default {
  name: 'SaveProjectComponent',
  created() {
    Mousetrap.bind(['command+s', 'ctrl+s'], () => {
      this.saveProjectJSON();
    });
  },
  methods: {
    parseFileName(file) {
      //'asdf/asdff/sdf.txt -> sdf.txt
      return file.split('/').pop();
    },
    parseAndDelete(htmlList) {
      htmlList.forEach(element => {
        if (element.children.length > 0) {
          console.log('in recurse');
          this.parseAndDelete(element.children);
        }
        delete element._vm;
        delete element.parent;
        delete element.open;
        delete element.active;
        delete element.style;
        delete element.class;
        delete element.innerStyle;
        delete element.innerClass;
        delete element.innerBackStyle;
        delete element.innerBackClass;
      });
    },
    saveProjectJSON() {
      console.log('THIS ONE');
      let projectLocation = this.$store.state.projects[
        this.$store.state.activeTab
      ].lastSavedLocation;
      if (projectLocation) {
        console.log('IN SAVE LOCATION', this.$store.state);
        let state = this.$store.state;
        let routes = state.routes;
        for (let view in routes) {
          routes[view].forEach(component => {
            let htmlList = component.htmlList;
            this.parseAndDelete(htmlList);
          });
        }
        let componentMap = this.$store.state.componentMap;
        console.log('compmap', componentMap);
        for (let component in componentMap) {
          if (componentMap[component].htmlList) {
            let comphtml = componentMap[component].htmlList;
            console.log('COMPHTML', comphtml);
            this.parseAndDelete(comphtml);
          }
        }

        fs.writeFileSync(projectLocation, JSON.stringify(state));

        console.log('PROJECT SAVED TO LAST SAVED LOCATION');
      } else {
        ipc.send('show-save-json-dialog');
      }
    }
  },
  mounted() {
    ipc.on('save-json-location', (event, data) => {
      //delete original key from local forage
      let deleteKey = this.$store.state.projects[this.$store.state.activeTab]
        .filename;
      localforage
        .removeItem(deleteKey)
        .then(function() {
          console.log(deleteKey, 'Key is cleared!');
        })
        .catch(function(err) {
          console.log(err);
        });

      let fileName = this.parseFileName(data);

      this.$set(this.$store.state.projects, this.$store.state.activeTab, {
        filename: fileName,
        lastSavedLocation: data
      });
      let state = this.$store.state;
      let routes = state.routes;
      for (let view in routes) {
        routes[view].forEach(component => {
          let htmlList = component.htmlList;
          this.parseAndDelete(htmlList);
        });
      }
      let componentMap = this.$store.state.componentMap;
      for (let component in componentMap) {
        if (component.htmlList) {
          let comphtml = component.htmlList;
          this.parseAndDelete(comphtml);
        }
      }

      fs.writeFileSync(data, JSON.stringify(state));
      localforage
        .setItem(fileName, JSON.parse(fs.readFileSync(data, 'utf8')))
        .then(result => {
          console.log('saved ', fileName, 'to local forage');
          console.log('result is', result);
        });
      console.log('PROJECT SAVED AS A JSON OBJECT!');
    });
  }
};
</script>

<style></style>
