import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../about/page.module.css";

function page() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.heroSection}>
          <h3 className={styles.hero_title}>About</h3>

          <div className={styles.keywords}>
            <p className={`${styles.presentation__sub_txt} body_02`}>
              Wandering
            </p>
            <div className="dot"></div>
            <p className={`${styles.presentation__sub_txt} body_02`}> Travel</p>
            <div className="dot"></div>
            <p className={`${styles.presentation__sub_txt} body_02`}>Culture</p>
          </div>
        </div>
      </header>
      <section className={styles.about__content__container}>
        <div className={styles.about__content__left}>
          <Image
            src="/landingpage/color_headS.webp"
            alt="Photography of Corentin Damas author of the website and photographies"
            className={`${styles.imgHeadS}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            width={720}
            height={480}
            quality={85}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MjAiIGhlaWdodD0iNDgwIiB2aWV3Qm94PSIwIDAgNzIwIDQ4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjwvc3ZnPg=="
          />
        </div>
        <article className={styles.about__content__right}>
          <div className={styles.about__text}>
            <p>
              Corentin Damas is my name. I am a French photographer living and
              working in Cagliari, Italy, since 2019. I studied photography at
              Speos in Paris and London, where I explored studio work and
              photojournalism. These two paths offered different perspectives:
              one focused on control and precision, while the other emphasized
              observation and storytelling. During those years, I spent many
              hours in London&#39;s museums, walking through rooms filled with
              paintings, sculptures, and pieces of history. The museums became a
              second school for me. They were quieter but just as valuable,
              teaching me how to look and how to wait.
            </p>
          </div>
          <Link
            href={"/gallery"}
            className={`${styles.about__link} gallery_Link`}
          >
            See Gallery <span className={styles.special}> _&gt;</span>
          </Link>
        </article>
      </section>

      <section className={styles.about__section}>
        <div>testing</div>
        <div className={styles.about__middle}>
          <div className={styles.about__image__container}>
            <Image
              src="/infrared/S/05-infrared.webp"
              alt="Infrared photography experiment showing surreal landscape"
              width={400}
              height={300}
              className={styles.about__image}
              sizes="(max-width: 768px) 100vw, 400px"
              quality={85}
            />
          </div>
          <div className={`${styles.project__legend_container} `}>
            <Link href={"/gallery/earth_and_sky"}>
              <span className={styles.legend_txt}>Between earth and sky</span>
            </Link>
            <div className={styles.verticalRule}></div>
          </div>
        </div>
        <div className={styles.about__text}>
          <p>
            I have always been interested in experimentation. Sometimes it
            involves technique, like working with film, infrared, or in the
            darkroom. Other times, it relates to approach, like finding a new
            way to engage with a subject or tell a story. This curiosity keeps
            the process lively and often results in surprises. Boundaries are
            important here. They create opportunities for experimentation and
            learning through practice. The darkroom teaches patience. Travel
            teaches observation. Each project serves as a small study, a way to
            explore something new and to keep progressing, step by step.
          </p>
        </div>
      </section>

      <section className={styles.about__section}>
        <div>test</div>
        <div className={styles.about__image__container}>
          <Image
            src="/museums/S/08-museums.webp"
            alt="Museum interior with visitors viewing artwork"
            width={400}
            height={300}
            className={styles.about__image}
            sizes="(max-width: 768px) 100vw, 400px"
            quality={85}
          />
        </div>
        <div className={styles.about__text}>
          <p>
            Over the years, I often think of a few names that shape how I view a
            scene. Jacob van Ruisdael shows me how a sky can tell a story: heavy
            cloud banks, trees acting as anchors, and water guiding the eye
            across the land. J. M. W. Turner illustrates how light moves within
            weather. He shows how edges can soften until the image feels like
            air and direction. Daido Moriyama teaches me to embrace roughness:
            grain, blur, strong contrast, and the movement of the street when
            the subject isn&#39;t posing. I also look to Todd Hido for the
            allure of night windows, to Michael Kenna for lines and restraint,
            and to Ansel Adams for craftsmanship and rigor in the work.
          </p>
        </div>
      </section>

      <section className={styles.about__section}>
        <div className={styles.about__image__container}>
          <Image
            src="/earth_and_sky/S/15-earth_and_sky.webp"
            alt="Landscape photograph showing natural beauty and composition"
            width={400}
            height={300}
            className={styles.about__image}
            sizes="(max-width: 768px) 100vw, 400px"
            quality={85}
          />
        </div>
        <div className={styles.about__text}>
          <p>
            I have always liked photobooks. Over the years, I&#39;ve built a
            small collection by slowly adding titles that interest me. My
            shelves are a mix of photobooks, books about photobooks, books on
            painting and printmaking, and volumes on art movements. From time to
            time, I take one down to look through it again. It&#39;s a calm way
            to spend an hour, seeing how other artists have approached their
            work and their subjects.
          </p>
        </div>
      </section>

      <section className={styles.about__section}>
        <div className={styles.about__image__container}>
          <Image
            src="/a_year_in_japan/S/12-a_year_in_japan.webp"
            alt="Japanese street scene showing cultural moments and travel"
            width={400}
            height={300}
            className={styles.about__image}
            sizes="(max-width: 768px) 100vw, 400px"
            quality={85}
          />
        </div>
        <div className={styles.about__text}>
          <p>
            Since I started, I have worked on several series that reflect
            different stages of my life and travels. Some are rooted in
            nostalgia, while others stem from discovery or experimentation.
            Together, they create a map of where I have been and what I have
            seen. They capture moments in time, small efforts to hold onto
            experiences before they fade. For me, photography is not just about
            making images. It&#39;s about shaping memory and experience, about
            creating something that lasts when the moment itself is gone. Each
            project begins, develops, and ends, but the photographs stay.
          </p>
        </div>
      </section>
    </>
  );
}

export default page;
