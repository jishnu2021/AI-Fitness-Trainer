import React from 'react'
import img from '../images/img.png'
import Cards from './Cards'
const Task = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
    <h1 className="mb-4 mt-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      We invest in the world’s potential
    </h1>
    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
      Here at Flowbite we focus on markets where technology, innovation, and
      capital can unlock long-term value and drive economic growth.
    </p>
  </div>
  <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0" />
</section>

    <Cards/>
    <Cards/>
    </>
  )
}

export default Task


