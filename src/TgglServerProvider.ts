import {
  EvaluationContext,
  JsonValue,
  Logger,
  OpenFeatureEventEmitter,
  Provider,
  ResolutionDetails,
  ServerProviderEvents,
} from '@openfeature/server-sdk'
import { TgglLocalClient } from 'tggl-client'
import { AnyProviderEvent, ProviderEventEmitter } from '@openfeature/core'

export class TgglServerProvider implements Provider {
  public readonly runsOn = 'server'
  readonly metadata = {
    name: 'Tggl',
  } as const
  public readonly client: TgglLocalClient
  events: ProviderEventEmitter<AnyProviderEvent>

  constructor(
    apiKey: ConstructorParameters<typeof TgglLocalClient>[0],
    options: ConstructorParameters<typeof TgglLocalClient>[1]
  ) {
    this.client = new TgglLocalClient(apiKey, options)

    this.events = new OpenFeatureEventEmitter()

    this.client.onConfigChange(() => {
      this.events.emit(ServerProviderEvents.ConfigurationChanged)
    })
  }

  async initialize(context?: EvaluationContext): Promise<void> {
    await this.client.fetchConfig()
  }

  async resolveBooleanEvaluation(
    flagKey: string,
    defaultValue: boolean,
    context: EvaluationContext,
    logger: Logger
  ): Promise<ResolutionDetails<boolean>> {
    return {
      value: Boolean(this.client.get(context, flagKey, defaultValue)),
    }
  }

  async resolveStringEvaluation(
    flagKey: string,
    defaultValue: string,
    context: EvaluationContext,
    logger: Logger
  ): Promise<ResolutionDetails<string>> {
    return {
      value: String(this.client.get(context, flagKey, defaultValue)),
    }
  }

  async resolveNumberEvaluation(
    flagKey: string,
    defaultValue: number,
    context: EvaluationContext,
    logger: Logger
  ): Promise<ResolutionDetails<number>> {
    return {
      value: Number(this.client.get(context, flagKey, defaultValue)),
    }
  }

  async resolveObjectEvaluation<T extends JsonValue>(
    flagKey: string,
    defaultValue: T,
    context: EvaluationContext,
    logger: Logger
  ): Promise<ResolutionDetails<T>> {
    return {
      value: this.client.get(context, flagKey, defaultValue),
    }
  }
}
