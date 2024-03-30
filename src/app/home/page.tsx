import Card from "../components/Card";
import FastingTracker from "../components/FastingTracker";

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Card title='Ready to Fasting'>
        <FastingTracker />
      </Card>
    </div>
  );
}
