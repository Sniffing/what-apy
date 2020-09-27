import ReactGA, { EventArgs } from 'react-ga';

interface IProps {
  key?: string;
  debug?: boolean;
  //tracking version may or may not switch across releases.
  trackingVersion?: string;
}

interface ITrackingEvent extends EventArgs {
}
interface ITrackingError {
  error: string;
  fatal?: boolean;
}

interface ITrackingLink {
  description: string;
  url: string;
}

export const createLinkClickEvent = (label: string): ITrackingEvent => {
  return {
    action: 'Click',
    category: 'Link click',
    label,
  }
}

export class TrackingStore {
  public constructor(props: IProps) {
    if (!props.key) {
      console.error('Analytics failed to initialise')
      return;
    }

    const debug = (props.debug) ? props.debug : true
    let version = 'UNVERSIONED';

    if (props.trackingVersion && !debug) {
      version = props.trackingVersion
    }

    this.initialiseTracking(props.key, debug, version)
  }

  private initialiseTracking(key: string, debug: boolean, version: string) {
    ReactGA.initialize(key, {
      debug,
      titleCase: false,
      gaOptions: {
        userId: 'developing'
      }
    });

    ReactGA.set({
      appVersion: version,
      appName: 'What APY'
    })
  }

  public trackPageView(pageUrl?: string) {
    ReactGA.pageview(pageUrl || '');
  }

  public trackEvent(event: ITrackingEvent) {
    const gaEvent: EventArgs = {
      ...event
    }
    ReactGA.event(gaEvent)
  }

  public trackNavigateAway(link: ITrackingLink) {
    const forceNavigationIfFail = () => {
      window.open(link.url, '_blank');
    }

    ReactGA.outboundLink({
      label: link.description
    },
    forceNavigationIfFail
    )
  }

  public trackError(trackingError: ITrackingError) {
    const { error: description, fatal = false } = trackingError;

    ReactGA.exception({
      description,
      fatal,
    })
  }
}