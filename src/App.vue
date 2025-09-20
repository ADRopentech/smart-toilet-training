<template>
  <div id = 'app'>
    <!-- section 1: Heading--> 
    <section class = "hero">
      <div class = "container">
        <h1>Welcome to Smart Toilet Dashboard</h1>
        <p>Monitor: status, tank, energy and temperature</p>
      </div>
    </section>

    <!-- section 2: Content with boxes-->
    <section class = "content">
      <div class = "container">
        <!--Row 1 3 boxes-->
        <div class = "row row-1">
          <div class = "card">
            <h2>Operating Status</h2>
            <p>Statatus : ON</p>
            <p>Last Update: 01-01-2001</p>
          </div>
          <div class = "card">
            <h2>Waste-tank Level</h2>
            <p>Status : OFF</p>
            <p>Last Update: 01-01-2001</p>
          </div>
          <div class = "card">
            <h2>Enenrgy Consumption</h2>
            <p>Real time: 465 W </p>
            <p>Daily Total: kWh</p>
          </div>
        </div>

        <!-- Row 2 : 2 Boxes-->
        <div class = "row row-2">
          <div class = "card">
            <h2>Toilet Usage</h2>
            <p>Status : OFF </p>
            <p>Last Update: 01-01-2001</p>
          </div>
          <div class = "card">
            <h2>Torrefaction Temperature</h2>
            <p>T1: 257 ^C </p>
            <p>T2: 304 ^C </p>
          </div>
        </div>

      </div>
    </section>

    <!-- Section 3: Footer-->
    <footer class = "site-footer">
      <div class = footer>
        © 2025 Cranfield. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'App',
  // this is a static page with hardcoded values - no JS logic needed for now
};
</script>

<style scoped>
/*color variable*/
:root {
  --deep-blue: #0b3d91;
  --grey-bg: #f3f4f667;
  --white: #ffffff;
  --black: #000000;
  --container-max: 1100px;
}

/*page variable*/
#app {
  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #222;
  line-height: 1.45;
}

/*constrain content*/
.container{
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 20px;
}

/* section 1  */
.hero{
  background: var(--deep-blue);
  color: rgb(1, 0, 0);
  padding: 48px 0;
}
.hero .container{
  display: block;
  text-align: center;
}
.hero h1 {
  margin: 0 0 8px;
  font-size: 32px;
  font-weight: 700;
}
.hero-desc{
  margin: 0;
  opacity: 0.95;
}

/* section 2 */
.content{
  background: var(--grey-bg);
  padding: 40px 0;
}
/* Row container for boxes */
.row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center; /* centers items when there are fewer than available columns */
  margin-bottom: 24px;
}
/* Card / Box styling */
.card {
  background: var(--white);
  padding: 18px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(12, 24, 40, 0.06);
  flex: 0 1 300px;      /* base width ~300px, can shrink on small screens */
  min-width: 220px;
  max-width: 340px;
}
.card h2 {
  margin: 0 0 10px;
  font-size: 18px;
}
.card p {
  margin: 6px 0;
  color: #333;
}


/* Section 3: Footer */
.site-footer {
  background: var(--black);
  color: rgb(4, 3, 3);
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
}


</style>
