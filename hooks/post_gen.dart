import 'dart:io';
import 'package:mason/mason.dart';

void run(HookContext context) async {
  await runPnpm(context: context);
}

Future<void> runPnpm({
  required HookContext context,
}) async {
  context.logger.info('📦 Installing commerce dependencies');
  await Process.run('pnpm', [
    'i',
    'next-intl'
  ]);
  context.logger.success('📦 commerce configured successfully 🚀');
}