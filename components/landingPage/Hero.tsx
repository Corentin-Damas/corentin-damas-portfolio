import Image from "next/image";
import styles from "./Hero.module.css";
import Gallery_link from "../Links/Gallery_link";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__background_containeur}>
        <Image
          src="/landingpage/XL/rainbow-bridge-XL.webp"
          alt="Bridge named rainbow Bridge from Tokyo, Japan"
          className={`${styles.bgDark} dark_mode_only`}
          quality={85} // 🚀 Légèrement augmentée pour WebP
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bsVbliW8qpKoGl5xC8lvwNTOCONJVV9/t/7/AF"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 100vw"
        />

        <Image
          src="/landingpage/XL/landscapes-Landing-XL.webp"
          alt="Floating torii from Miyajima, Japan"
          className={`${styles.bglight} light_mode_only`}
          quality={85} // 🚀 Légèrement augmentée pour WebP
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9Ijg1MyIgdmlld0JveD0iMCAwIDEyODAgODUzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmYWZjIi8+PC9zdmc+"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 100vw"
        />
      </div>
      <section className={`${styles.hero__content_containeur} content-container `}>
        <div className={`${styles.presentation_containeur} `}>
          <div className={styles.presentation}>
            <h3 className={styles.presentation__txt}>
              Project Base Photographer
            </h3>
            <Gallery_link path="/gallery" content="See Gallery" />
          </div>
        </div>

        <div className={`${styles.img_caption__containeur} dark_mode_only`}>
          <div className={styles.img_caption__up}>
            <p>Rainbow Bridge</p>
            <p className={styles.sec_txt}>東京港連絡橋 - レインボーブリッジ</p>
          </div>
          <div className={styles.img_caption__down}>
            <p>
              Tokyo
              <br />
              Japan
            </p>
          </div>
        </div>

        <div className={`${styles.img_caption__containeur} light_mode_only `}>
          <div className={styles.img_caption__up}>
            <p>Itsukushima-jinja</p>
            <p className={styles.sec_txt}>厳島神社</p>
          </div>
          <div className={styles.img_caption__down}>
            <p>
              Miyajima
              <br />
              Japan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
