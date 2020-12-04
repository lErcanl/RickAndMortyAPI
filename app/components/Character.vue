<template>
  <Page>
    <ActionBar title="Character" />
    <ScrollView>
      <StackLayout class="character-panel">
        <Image :src="characterData.image" style="height: 500px" />
        <Label :text="'Name: ' + characterData.name" />

        <Label :text="'Status: ' + characterData.status" />
        <Label :text="'Species: ' + characterData.species" />
        <Label :text="'Type: ' + characterData.type" />
        <Label :text="'Gender: ' + characterData.gender" />
        <Label :text="'Origin: ' + originName" />
        <Label :text="'Location: ' + Location" />
        <Label
          text="Episodes within that Character :"
          class="character-episode"
        />

        <ListView
          for="characterEpisode in characterEpisodes"
          key="characterEpisode"
          style="height: 5000px"
        >
          <v-template>
            <Label
              :text="characterEpisode.slice(40, 42)"
              class="nums-episode"
            ></Label>
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      characterData: [],
      originName: "",
      Location: "",
      characterEpisodes: [],
    };
  },
  props: ["characterItem"],
  created() {
    fetch(this.characterItem) //getting character api with props
      .then((response) => this.$err.error(response))
      .then((data) => {
        this.characterData = data;
        this.characterEpisodes = this.characterData.episode;

        this.originName = this.characterData.origin.name;
        this.Location = this.characterData.location.name;
      });
  },
};
</script>

<style>
.character-panel {
  font-size: 24px;
}

.character-episode {
  margin-bottom: 20px;
}
.nums-episode {
  font-size: 15px;
}
</style>