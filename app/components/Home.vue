<template>
  <Page>
    <ActionBar title="Main Page" />
    <ScrollView>
      <StackLayout class="home-panel">
        <Label text="ALL EPISODES" class="title"></Label>

        <ListView
          for="item in items"
          key="item"
          @itemTap="onItemTap"
          style="height: 1250px"
        >
          <v-template>
            <FlexboxLayout flexDirection="column">
              <Label :text="'Episode Name: ' + item.name" />
              <Label :text="'Date: ' + item.air_date" />
              <Label :text="'Episode: ' + item.episode" />

              <Label :text="item.url" />
              <Label :text="'Created At: ' + item.created.slice(0, 10)" />
            </FlexboxLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import EpisodeDetail from "./EpisodeDetail";
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    //Fetching 41 data
    fetch("https://rickandmortyapi.com/api/episode?page=1")
      .then((response) => this.$err.error(response))
      .then((data) => {
        this.items = data.results;
        fetch(data.info.next)
          .then((response) => this.$err.error(response))
          .then((data) => {
            this.items = this.items.concat(data.results);
            fetch(data.info.next)
              .then((response) => this.$err.error(response))
              .then((data) => {
                this.items = this.items.concat(data.results);
              });
          });
      });
  },
  methods: {
    //getting id for clicked episode and routing EpisodeDetail.
    onItemTap: function (args) {
      this.$navigateTo(EpisodeDetail, {
        props: { item: args.index + 1 },
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
Label {
  font-weight: 400;
}
.home-panel {
  font-size: 16px;
}
.title {
  margin: 15;
  text-decoration: underline;
  text-align: center;
  font-weight: 800;
}
</style>
/*
  