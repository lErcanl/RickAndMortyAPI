<template>
  <Page>
    <ActionBar title="Episode Detail" />
    <ScrollView>
      <StackLayout class="episode-panel">
        <Label :text="' Name: ' + episodeData.name" />
        <Label :text="' Date: ' + episodeData.air_date" />
        <Label :text="' Episode: ' + episodeData.episode" />
        <Label text=" These characters played in that episode:" />
        <ListView
          for="character in characters"
          @itemTap="onItemTap"
          style="height: 8000px"
        >
          <v-template>
            <FlexboxLayout flexDirection="column">
              <Label :text="character.name" class="label-text" />
            </FlexboxLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Character from "./Character";
export default {
  props: ["item"],
  data() {
    return {
      episodeData: [],
      characters: [],
    };
  },
  created() {
    fetch("https://rickandmortyapi.com/api/episode/" + this.item) //item is the "id".Taken by props
      .then((response) => this.$err.error(response))
      .then((data) => {
        this.episodeData = data;

        //fetching characters api which in the array

        for (let i = 0; i < this.episodeData.characters.length; i++) {
          fetch(this.episodeData.characters[i])
            .then((response) => this.$err.error(response))
            .then((data) => {
              this.characters.push(data);
            });
        }
      });
  },
  methods: {
    onItemTap: function (args) {
      //getting api url that clicked character to Send Character component

      this.$navigateTo(Character, {
        props: { characterItem: this.characters[args.index].url },
      });
    },
  },
};
</script>

<style>
.episode-panel {
  font-size: 20px;
}
.label-text {
  font-size: 18px;
}
</style>


